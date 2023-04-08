import { IAssignedArmy, AssignedArmyPriority } from "@hexchess-database/index";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";

export class AssignedArmyDto implements IAssignedArmy {

  id: number;
  profileId: string;

  @ApiProperty({
    type: String,
    required: true
  })
  @IsString()
  armyId: string;

  @ApiProperty({
    required: true,
    enum: Number,
    example: AssignedArmyPriority.Primary,
  })
  @IsEnum(AssignedArmyPriority)
  priority: AssignedArmyPriority;

  constructor(data: Partial<AssignedArmyDto> = {}) {
    Object.assign(this, data);
  }
}