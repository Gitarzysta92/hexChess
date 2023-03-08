import { TileSide } from "../../../board/constants/tile-side";
import { AbilityType } from "../constants/ability-type";

export interface NetAbility {
  type: AbilityType.Net,
  directions: TileSide[];
}