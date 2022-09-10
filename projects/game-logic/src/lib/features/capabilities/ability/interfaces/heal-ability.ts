import { Direction } from "../../../board/constants/tile-sides";
import { AbilityType } from "../constants/ability-type";

export interface HealAbility {
  type: AbilityType.Heal,
  value: number,
  directions: Direction[];
}