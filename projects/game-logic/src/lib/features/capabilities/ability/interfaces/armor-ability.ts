import { Direction } from "../../../board/constants/tile-sides";
import { AbilityType } from "../constants/ability-type";

export interface ArmorAbility {
  type: AbilityType.Armor,
  directions: Direction[];
}