import { ActionType } from "../constants/action-type";
import { ActionTargetType } from "../constants/target-type";

export interface BattleAction {
  type: ActionType.Battle;
  targetType: ActionTargetType;
}