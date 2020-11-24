import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/database/models/user.model';
import { UserDto } from '../models/userDto';
import { ProfileDto } from '../models/profileDto';
import { Profile } from 'src/database/models/profile.model';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile)
    private profile: typeof Profile,
    private sequelize: Sequelize,
  ) {}


  public async search(profile: { [key: string]: string }) {
    return await this.profile.findOne({ where: { ...profile } });
  }


  public async createProfile(userId: number, nickname: string): Promise<ProfileDto> {
    let createdUser;

    await this.sequelize.transaction(async t => {
      const transactionHost = { transaction: t };

      createdUser = await this.profile.create(
        {
          nickname: nickname,
          userId: userId
        },
        transactionHost,
      );
    });

    return createdUser;
  }

  public async updateProfile(userId: number) {
    throw new Error('Method not implemented.');
  }

  public async getProfile(userId: number) {
    const result = await this.profile.findOne({
      where: {
        userId: userId,
      },
    });
    return result ? new ProfileDto(result) : null;
  }
}
