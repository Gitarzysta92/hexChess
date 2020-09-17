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
    private sequelize: Sequelize
  ) { }


  public async createProfile(userId: number): Promise<ProfileDto> {
    let createdUser;

    await this.sequelize.transaction(async t => {
      const transactionHost = { transaction: t };

      const asd = new Date(Date.now()).toISOString()

      createdUser = await this.profile.create(
        { 
          // email: user.email, 
          // password: hash,
          // role: 'admin',
        },
        transactionHost,
      );
    });

    return createdUser
  }

  public async updateProfile(userId: number) {
    throw new Error('Method not implemented.');
  }


  public async getProfile(userId: number) {
    const result = await this.profile.findOne({
      where: {
        userId: userId
      }
    }); 
    return result ? new ProfileDto(result) : null
  }

}
