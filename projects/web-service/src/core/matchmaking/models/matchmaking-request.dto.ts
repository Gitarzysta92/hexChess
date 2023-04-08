import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class MatchmakingRequestDto {

  @ApiProperty({
    type: Number,
    required: true
  })
  @IsNumber()
  @IsPositive()
  requiredPlayers: number;
}