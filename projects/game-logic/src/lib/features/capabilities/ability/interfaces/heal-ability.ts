import { TileSide } from "../../../board/constants/tile-side";
import { AbilityType } from "../constants/ability-type";

export interface HealAbility {
  type: AbilityType.Heal,
  value: number,
  directions: TileSide[];
}