import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/database/models/user.model';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../models/userDto';
const saltRounds = 10;



@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User)
    private user: typeof User,
    private sequelize: Sequelize
  ) { }


  public async createUser(user: UserDto): Promise<UserDto> {
    let createdUser;

    await this.sequelize.transaction(async t => {
      const transactionHost = { transaction: t };

      const hash = await bcrypt.hash(user.password, saltRounds)
      const asd = new Date(Date.now()).toISOString()

      createdUser = await this.user.create(
        { 
          email: user.email, 
          password: hash,
          role: 'admin',
        },
        transactionHost,
      );
    });

    return createdUser
  }

  async createMany() {
    try {
      await this.sequelize.transaction(async t => {
        const transactionHost = { transaction: t };
  
        await this.user.create(
            { firstName: 'Abraham', lastName: 'Lincoln' },
            transactionHost,
        );
        await this.user.create(
            { firstName: 'John', lastName: 'Boothe' },
            transactionHost,
        );
      });
    } catch (err) {
      // Transaction has been rolled back
      // err is whatever rejected the promise chain returned to the transaction callback
    }
  }

  async getUser(email: string): Promise<UserDto> {
    const result = await this.user.findOne({
      where: {
        email: email
      }
    }); 
    return result ? new UserDto(result) : null
  }


  async removeUser(userId: number): Promise<number> {
    const result = await User.destroy({
      where: {
        id: userId
      }
    });
    return result;
  }
}
