import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Length } from "class-validator";

export class MyProfileUpdateDto {

  @ApiProperty({
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  nickname?: string;

  @ApiProperty({
    type: Number,
    required: false
  })
  @IsOptional()
  @IsNumber()
  languageId?: number;

}