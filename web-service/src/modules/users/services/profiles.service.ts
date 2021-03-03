import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/database/models/user.model';
import { ProfileDto } from '../models/profileDto';
import { Profile } from 'src/database/models/profile.model';


export class ServiceException {
  public status: string;
  public error: Error;
  constructor(data: ServiceException) {
    this.status = data.status;
    this.error = data.error;
  }
}



@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile)
    private profile: typeof Profile,
    private sequelize: Sequelize,
  ) {}


  public async search(profile: { [key: string]: string }): Promise<ProfileDto> {

    const validKeys = Object.keys(Profile.rawAttributes).concat(Object.keys(User.rawAttributes));
    const isQueryValid = Object.keys(profile).every(key => validKeys.some(vk =>  vk === key));

    if(!isQueryValid) throw new ServiceException({
      status: 'dupa',
      error: new Error()
    })

    const result = await this.profile.findOne({
      having: { ...profile },
      include: [
        { model: User, required: true}
      ]
    });

    return result ? new ProfileDto(result) : null;
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
