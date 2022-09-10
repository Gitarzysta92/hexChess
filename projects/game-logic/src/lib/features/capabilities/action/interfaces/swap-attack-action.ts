import { ActionType } from "../constants/action-type";
import { ActionTargetType } from "../constants/target-type";

export interface SwapAttackAction {
  type: ActionType.SwapAttack;
  targetType: ActionTargetType;
}