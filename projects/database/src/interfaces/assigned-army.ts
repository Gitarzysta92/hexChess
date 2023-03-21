import { AssignedArmyPriority } from "../constants/assigned-army-priority";

export interface IAssignedArmy  {
  id: number;
  profileId: string;
  armyId: string;
  priority: AssignedArmyPriority;
}


