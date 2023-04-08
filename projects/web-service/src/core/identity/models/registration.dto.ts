import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class RegistrationDto {

  @ApiProperty({
    type: String,
    required: true
  })
  @IsString()
  @Length(5, 100)
  public email: string;

  @ApiProperty({
    type: String,
    required: true
  })
  @IsString()
  @Length(8, 100)
  public password: string;

  @ApiProperty({
    type: String,
    required: true
  })
  @IsString()
  @Length(5, 100)
  public nickname: string;

  constructor(data: RegistrationDto) {
    Object.assign(this, data);
  }
}
