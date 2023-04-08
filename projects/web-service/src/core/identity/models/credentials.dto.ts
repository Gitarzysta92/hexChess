import { ApiProperty } from "@nestjs/swagger";

export class CredentialsDto {

  @ApiProperty({
    type: String,
    required: false
  })
  username: string;

  @ApiProperty({
    type: String,
    required: false
  })
  password: string;

  constructor(data: CredentialsDto) {
    Object.assign(this, data);
  }
}