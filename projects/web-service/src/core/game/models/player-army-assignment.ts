import { AssignedArmy } from "src/core/armies/models/assigned-army.entity";

export type IPlayerArmyAssignment = Pick<AssignedArmy, 'profileId' | 'armyId'>;