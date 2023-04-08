import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from 'class-validator';

export class ProfileQueryDto {

  @ApiProperty({
    type: String,
    required: false
  })
  @IsString()
  @IsOptional()
  @Length(36, 36)
  id: string;

  @ApiProperty({
    type: String,
    required: false
  })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  nickname: string;

}