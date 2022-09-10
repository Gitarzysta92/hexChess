import { ActionType } from "../../action/constants/action-type";
import { ActionTargetType } from "../../action/constants/target-type";
import { Direction } from "../../../board/constants/tile-sides";
import { AbilityType } from "../constants/ability-type";

export interface ProvideAbility {
  type: AbilityType.Provide,
  action: ActionType,
  value: number;
  actionTarget: ActionTargetType,
  directions: Direction[]
}