import { IUser } from "src/database/models/user.model";



export class UserDto implements IUser {
  public id;
  public email;
  public password;
  public role;
  public createdAt;
  public updatedAt;

  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}