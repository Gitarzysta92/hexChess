import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import * as bcrypt from 'bcrypt';
const saltRounds = 10;




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

  public async createUser(user: User): Promise<void> {
    await this.sequelize.transaction(async t => {
      const transactionHost = { transaction: t };

      const hash = await bcrypt.hash(user.password, saltRounds)
      const asd = new Date(Date.now()).toISOString()

      await this.userModel.create(
        { 
          email: user.email, 
          password: hash,
          role: 'admin',
          //createdAt: asd,
          //updatedAt: 'asdasd'
        },
        transactionHost,
      );
    })
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
