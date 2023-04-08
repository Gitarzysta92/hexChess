import { IAccount } from "@hexchess-database/index";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class MyAccountDto implements Omit<IAccount, 'password'> {
  
  public id: string;

  @ApiProperty({
    type: String,
    required: true
  })
  @IsEmail() @MaxLength(40)
  public email: string;


  @ApiProperty({
    type: Number,
    required: true
  })
  @IsNumber() @IsPositive()
  public languageId: number;

  @ApiProperty({
    type: String,
    required: false
  })
  @IsOptional()
  role: string;

  @ApiProperty({
    type: Date,
    required: false
  })
  @IsOptional()
  public createdAt: Date;

  @ApiProperty({
    type: Date,
    required: false
  })
  @IsOptional()
  public updatedAt: Date;

  constructor(data: Partial<MyAccountDto> = {}) {
    this.id = data.id;
    this.email = data.email;
    this.languageId = data.languageId;
    this.role = data.role;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}