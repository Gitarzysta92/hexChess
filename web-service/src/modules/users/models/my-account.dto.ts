import { IsEmail, IsNumber, IsOptional, IsPositive, IsString, MaxLength, maxLength } from "class-validator";

export class MyAccountDto {
  @IsEmail() @MaxLength(40)
  email: string;
  @IsOptional() @IsString() @MaxLength(40)
  password: string;
  @IsNumber() @IsPositive()
  languageId: number;
  @IsOptional()
  createdAt: Date;
  @IsOptional()
  updatedAt: Date;

  constructor(data: Partial<MyAccountDto> = {}) {
    this.email = data.email;
    this.password = data.password;
    this.languageId = data.languageId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}