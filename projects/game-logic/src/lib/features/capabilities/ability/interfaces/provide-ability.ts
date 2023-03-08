import { ActionType } from "../../action/constants/action-type";
import { ActionTargetType } from "../../action/constants/target-type";
import { TileSide } from "../../../board/constants/tile-side";
import { AbilityType } from "../constants/ability-type";

export interface ProvideAbility {
  type: AbilityType.Provide,
  action: ActionType,
  value: number;
  actionTarget: ActionTargetType,
  directions: TileSide[]
}