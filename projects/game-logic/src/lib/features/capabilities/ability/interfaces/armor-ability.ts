import { TileSide } from "../../../board/constants/tile-side";
import { AbilityType } from "../constants/ability-type";

export interface ArmorAbility {
  type: AbilityType.Armor,
  directions: TileSide[];
}