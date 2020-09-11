import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/database/models/user.model';
import { UserDto } from '../models/userDto';
import { ProfileDto } from '../models/profileDto';

@Injectable()
export class ProfilesService {

  constructor(
    @InjectModel(User)
    private user: typeof User,
    private sequelize: Sequelize
  ) { }


  public async createProfile(userId: number): Promise<ProfileDto> {
    let createdUser;

    await this.sequelize.transaction(async t => {
      const transactionHost = { transaction: t };

      const asd = new Date(Date.now()).toISOString()

      createdUser = await this.user.create(
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

}
