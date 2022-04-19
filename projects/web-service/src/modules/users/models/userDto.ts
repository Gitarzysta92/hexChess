import { IsString, Length } from 'class-validator';
import { IUser } from 'hexchess-database';


interface IRegistration {
  email: string;
  password: string;
  nickname: string;
}


export class UserDto implements IUser {
  public id: number;
  public email: string;
  public password: string;
  public role: string;
  public createdAt: Date;
  public updatedAt: Date;



  constructor(data: Partial<UserDto> = {}) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}



export class UserRegistrationDto implements IRegistration {
  @IsString()
  @Length(5, 100)
  public email: string;
  @IsString()
  @Length(8, 100)
  public password: string;
  @IsString()
  @Length(5, 100)
  public nickname: string;

  constructor(data: UserRegistrationDto) {
    this.email = data?.email;
    this.password = data?.password;
    this.nickname = data?.nickname;
  }
}
