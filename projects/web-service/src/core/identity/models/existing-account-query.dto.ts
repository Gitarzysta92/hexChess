import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ExistingAccountQueryDto {

  @ApiProperty({
    type: String,
    example: '2f9cdc59-05f2-4e20-93cc-a13163ce408f',
    required: false
  })
  @IsOptional()
  id?: string;

  @ApiProperty({
    type: String,
    example: 'some.example@email.com',
  })
  @IsString()
  email: string;

}