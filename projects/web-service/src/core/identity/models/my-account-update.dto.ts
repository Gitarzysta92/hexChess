import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsPositive, MaxLength } from "class-validator";

export class MyAccountUpdateDto {

  @Exclude()
  public id?: string;

  @ApiProperty({
    type: String,
    required: false
  })
  @IsEmail()
  @MaxLength(40)
  @IsOptional()
  public email?: string;

  @ApiProperty({
    type: Number,
    required: false
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  public languageId?: number;

  @ApiProperty({
    type: String,
    required: false
  })
  @IsOptional()
  role?: string;

  @ApiProperty({
    type: String,
    required: false
  })
  @IsOptional()
  @MaxLength(40)
  public password?: string;


}
