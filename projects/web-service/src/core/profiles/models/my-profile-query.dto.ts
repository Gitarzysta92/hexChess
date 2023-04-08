import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";

export class MyProfileQueryDto {

  @ApiProperty({
    type: String,
    required: true
  })
  @IsString()
  @Length(1, 100)
  nickname: string;

  @ApiProperty({
    type: String,
    required: true
  })
  @IsNumber()
  languageId: string;

}