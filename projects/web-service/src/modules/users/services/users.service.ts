import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../models/userDto';
import { QueryAction, QueryResult, Update } from 'src/aspects/events/services/models/query-result';
import { Op } from 'sequelize';
import { User } from 'src/db-models/user';


const saltRounds = 10;


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User)
    private _user: typeof User,
    private _sequelize: Sequelize,
  ) {}

  public async createUser(user: UserDto): Promise<UserDto> {
    let createdUser;


    await this._sequelize.transaction(async t => {
      const transactionHost = { transaction: t };

      const hash = await bcrypt.hash(user.password, saltRounds);

      createdUser = await this._user.create(
        {
          email: user.email,
          password: hash,
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        transactionHost,
      );
    });

    return new UserDto(createdUser);
  }

  public async getUser(email: string): Promise<UserDto> {
    const result = await this._user.findOne({
      where: {
        email: email,
      },
    });
    return result ? new UserDto(result) : null;
  }

  public async getUserById(id: number): Promise<UserDto> {
    const result = await this._user.findOne({
      where: { id }
    })

    return result ? new UserDto(result) : null;
  }


  public async updateUser(user: UserDto): Promise<QueryResult<Update, User>> {
    const result = await this._sequelize.transaction(async t => {

      const userFromDb = await this._user.findOne({
        where: { id: user.id },
        transaction: t
      });

      user.password = user.password ? await bcrypt.hash(user.password, saltRounds) : userFromDb.password;
      user.updatedAt = new Date();
      user.createdAt = userFromDb.createdAt;
      user.role = userFromDb.role;

      return await this._user.update(user, {
        where: { id: user.id },
        transaction: t
      }); 

    });

    return new QueryResult(QueryAction.Update, result as any);
  }

  public async deleteUser(userId: number): Promise<number> {
    const result = await User.destroy({
      where: {
        id: userId,
      },
    });
    return result;
  }


  public async updateUserPassword(id: any, password: string): Promise<void> {
    const hash = await bcrypt.hash(password, saltRounds);

    await this._user.update({ password: hash }, {
      where: { id }
    });

    return;
  }
 
  public async checkIsUserExists(user: { [key: string]: any }) {
    let query = {}

    if (user.id) {
      const { id, ...props } = user;
      query = { ...props, [Op.not]: [{ id }] };
    } else {
      query = user
    }

    const result = await this._user.count({
      where: query
    });

    return result > 0;
  } 
}









// async createMany() {
//   try {
//     await this._sequelize.transaction(async t => {
//       const transactionHost = { transaction: t };

//       await this._user.create(
//         { firstName: 'Abraham', lastName: 'Lincoln' },
//         transactionHost,
//       );
//       await this._user.create(
//         { firstName: 'John', lastName: 'Boothe' },
//         transactionHost,
//       );
//     });
//   } catch (err) {
//     // Transaction has been rolled back
//     // err is whatever rejected the promise chain returned to the transaction callback
//   }
// }





