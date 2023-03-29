import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional } from "class-validator";

export class ExistingUserQueryDto {

  @ApiProperty({
    type: Number,
    example: '1',
    required: false
  })
  @IsOptional()
  id: number;
  
  @ApiProperty({
    type: String,
    example: 'admin@hex.com',
  })
  @IsEmail()
  email: string;
}