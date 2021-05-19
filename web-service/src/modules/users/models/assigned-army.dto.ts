import { IsEnum, IsString } from "class-validator";
import { ArmyType, AssignedArmyPriority, IAssignedArmy } from "src/database/models/assigned-army.model";
import { Profile } from "src/database/models/profile.model";

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