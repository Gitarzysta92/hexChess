import { ApiProperty } from "@nestjs/swagger";

export class PasswordResetDto {

  @ApiProperty({
    type: String,
    required: true
  })
  email: string;
  
}