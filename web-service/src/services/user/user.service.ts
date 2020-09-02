import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';


export interface Credentials {
  login: string;
  password: string;
}


const sampleUser: Credentials = {
  login: 'test',
  password: 'test'
};


@Injectable()
export class UserService {

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private sequelize: Sequelize
  ) { }



  public async authenticate(data: Credentials): Promise<string> {
    const { login, password } = sampleUser;
    return data.login === login && data.password === password ? 'token' : null;
  }
  
  async createMany() {
    try {
      await this.sequelize.transaction(async t => {
        const transactionHost = { transaction: t };
  
        await this.userModel.create(
            { firstName: 'Abraham', lastName: 'Lincoln' },
            transactionHost,
        );
        await this.userModel.create(
            { firstName: 'John', lastName: 'Boothe' },
            transactionHost,
        );
      });
    } catch (err) {
      // Transaction has been rolled back
      // err is whatever rejected the promise chain returned to the transaction callback
    }
  }
}
