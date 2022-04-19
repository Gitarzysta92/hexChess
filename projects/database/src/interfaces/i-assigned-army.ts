import { ArmyType } from "../consts/army-type";
import { AssignedArmyPriority } from "../consts/assigned-army-priority";

export interface IAssignedArmy  {
  id: number;
  profileId: string;
  armyId: ArmyType;
  priority: AssignedArmyPriority;
}


