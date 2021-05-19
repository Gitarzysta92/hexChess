import { Optional } from "@nestjs/common";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class ExistingUserQueryDto {
  @IsOptional()
  id: number;
  @IsEmail()
  email: string;
}
