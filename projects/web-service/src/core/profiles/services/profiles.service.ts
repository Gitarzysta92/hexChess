import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ProfileDto } from '../models/profile.dto';
import { Op } from 'sequelize';
import { BlobStorageClient } from 'src/infrastructure/blob-storage-client/blob-storage-client';
import { AssignedArmy } from 'src/core/armies/models/assigned-army.entity';
import { Profile } from 'src/core/profiles/models/profile.entity';
import { Account } from 'src/core/identity/models/account.entity';
import * as crypto from 'crypto';

@Injectable()
export class ProfilesService {

  constructor(
    @InjectModel(Profile)
    private readonly _profile: typeof Profile,
    private readonly _sequelize: Sequelize,
    private readonly _blobStorage: BlobStorageClient
  ) {}

  public async search(profile: { [key: string]: any }): Promise<ProfileDto[]> {
    const result = await this._profile.findAll({
      having: profile,
      include: [
        { model: Account, required: true }
      ]
    });
    return result?.length > 0 ? result.map(p => new ProfileDto(p)) : null;
  }


  public async checkIsProfileExists(profile: { [key: string]: any }): Promise<boolean> {
    let query = {}

    if (profile.id) {
      const { id, ...props } = profile;
      query = { ...props, [Op.not]: [{ id }] };
    } else {
      query = profile
    }

    const result = await this._profile.count({
      where: query,
      include: [
        { model: Account, required: true }
      ]
    });

    return result > 0;
  }

  public async checkNicknameIsTaken(nickname: string): Promise<boolean> {
    const result = await this._profile.count({
      where: { nickname },
    });
    return result > 0;
  }


  public async createProfile(accountId: string, nickname: string): Promise<ProfileDto> {
    let createdUser;

    await this._sequelize.transaction(async t => {
      const transactionHost = { transaction: t };

      createdUser = await this._profile.create(
        {
          nickname: nickname,
          accountId: accountId
        },
        transactionHost,
      );
    });

    return createdUser;
  }

  public async updateProfile(profile: Partial<ProfileDto>) {
    const profileFromDb = await this._profile.findOne({
      where: { id: profile.id, },
    });

    Object.keys(profile).forEach(k => profileFromDb[k] = profile[k])
    const result = await this._profile.update(profileFromDb, {
      where: { id: profileFromDb.id, },
      returning: true,
    })

    return result;
  }

  public async getProfileByAccountId(accountId: string): Promise<ProfileDto> {
    const result = await this._profile.findOne({
      include: [
        AssignedArmy
      ],
      where: {
        accountId: accountId,
      },
    });
    return result ? new ProfileDto(result) : null;
  }

  public async getProfileId(accountId: string): Promise<string> {
    const result = await this._profile.findOne({
      attributes: ['id'],
      where: {
        accountId: accountId,
      },
    });

    return result.id;
  }


  public async updateAvatar(profileId: string, fileName: string, buffer: Buffer): Promise<string> {
    fileName = crypto.createHash('md5').update(fileName).digest('hex');
    const imageName = await this._blobStorage.upload(fileName, buffer);
    if (!imageName) return;

    await this._profile.update({ avatarFileName: fileName }, {
      where: {
        id: profileId
      }
    });

    return fileName;
  }

}
