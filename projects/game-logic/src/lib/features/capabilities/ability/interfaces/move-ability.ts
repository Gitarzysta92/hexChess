import { AbilityType } from "../constants/ability-type";


export interface MoveAbility {
  type: AbilityType.Move,
  usingsPerRound: number
}