import { IsEnum, IsString } from "class-validator";
import { IAssignedArmy, ArmyType, AssignedArmyPriority } from "hexchess-database";
import { Profile } from "src/db-models/profile";



export class AssignedArmyDto implements IAssignedArmy {

  id: number;
  @IsString()
  profileId: string;
  @IsEnum(ArmyType)
  armyId: ArmyType;
  @IsEnum(AssignedArmyPriority)
  priority: AssignedArmyPriority;
  profile?: Profile;

  constructor(data: Partial<AssignedArmyDto> = {}) {
    this.id = data.id;
    this.profileId = data.profileId;
    this.armyId = data.armyId;
    this.priority = data.priority;
    this.profile = data.profile;
  }
}

export class MyAssignedArmyDto implements IAssignedArmy {
  id: number;
  profileId: string;
  @IsEnum(ArmyType)
  armyId: ArmyType;
  @IsEnum(AssignedArmyPriority)
  priority: AssignedArmyPriority;
}