import { Direction } from "../../../board/constants/tile-sides";
import { AbilityType } from "../constants/ability-type";

export interface NetAbility {
  type: AbilityType.Net,
  directions: Direction[];
}