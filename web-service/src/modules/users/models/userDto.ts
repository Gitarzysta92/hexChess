import { IUser, User } from 'src/database/models/user.model';

export class UserDto implements IUser {
  public id;
  public nickname;
  public email;
  public password;
  public role;
  public createdAt;
  public updatedAt;

  constructor(data: Partial<UserDto>) {
    this.id = data.id;
    this.nickname = data.nickname
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
