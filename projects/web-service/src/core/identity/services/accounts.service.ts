import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { QueryAction, QueryResult, Update } from 'src/aspects/events/services/models/query-result';
import { Op } from 'sequelize';
import { Account } from 'src/core/identity/models/account.entity';
import { RegistrationDto } from '../models/registration.dto';
import { AccountDto } from '../models/account.dto';
import { ExistingAccountQueryDto } from '../models/existing-account-query.dto';
import { SALT_ROUNDS } from '../constants/salt-rounds';
import { v4 as uuid } from 'uuid';
import { AccountRole } from '@hexchess-database/constants/account-role.enum';


@Injectable()
export class AccountsService {

  constructor(
    @InjectModel(Account)
    private _account: typeof Account,
    private _sequelize: Sequelize,
  ) {}

  public async createAccount(user: RegistrationDto): Promise<AccountDto> {
    let createdAccount;


    await this._sequelize.transaction(async t => {
      const transactionHost = { transaction: t };
      const hash = await bcrypt.hash(user.password, SALT_ROUNDS);

      createdAccount = await this._account.create(
        {
          id: uuid(),
          email: user.email,
          password: hash,
          role: AccountRole.User,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        transactionHost,
      );
    });

    return new AccountDto(createdAccount);
  }

  public async getAccountByEmail(email: string): Promise<AccountDto> {
    const result = await this._account.findOne({
      where: {
        email: email,
      },
    });
    return result ? new AccountDto(result) : null;
  }

  public async getAccountById(id: string): Promise<AccountDto> {
    const result = await this._account.findOne({
      where: { id }
    })

    return result ? new AccountDto(result) : null;
  }


  public async updateAccount(account: AccountDto): Promise<QueryResult<Update, Account>> {
    const result = await this._sequelize.transaction(async t => {

      const userFromDb = await this._account.findOne({
        where: { id: account.id },
        transaction: t
      });

      account.password = account.password ? await bcrypt.hash(account.password, SALT_ROUNDS) : userFromDb.password;
      account.updatedAt = new Date();
      account.createdAt = userFromDb.createdAt;
      account.role = userFromDb.role;

      return await this._account.update(account, {
        where: { id: account.id },
        transaction: t
      }); 

    });

    return new QueryResult(QueryAction.Update, result as any);
  }

  public async deleteAccount(accountId: string): Promise<number> {
    const result = await Account.destroy({
      where: {
        id: accountId,
      },
    });
    return result;
  }


  public async updateAccountPassword(id: string, password: string): Promise<void> {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    await this._account.update({ password: hash }, {
      where: { id }
    });

    return;
  }
 
  public async checkIsAccountExists(account: ExistingAccountQueryDto): Promise<boolean> {
    let query = {}

    if (!!account.id) {
      const { id } = account;
      query = { [Op.not]: [{ id }] };
    }

    Object.assign(query, { email: account.email })

    const result = await this._account.count({
      where: query
    });

    return result > 0;
  } 
}