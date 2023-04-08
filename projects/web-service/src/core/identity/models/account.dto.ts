import { IAccount } from "@hexchess-database/index";

export class AccountDto implements Omit<IAccount, 'password'> {
  public id: string;
  public email: string;
  public password?: string;
  public role: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(data: Partial<AccountDto>) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}