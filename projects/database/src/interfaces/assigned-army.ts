import { AssignedArmyPriority } from "../constants/assigned-army-priority";

export interface IAssignedArmy  {
  profileId: string;
  armyId: string;
  priority: AssignedArmyPriority;
}