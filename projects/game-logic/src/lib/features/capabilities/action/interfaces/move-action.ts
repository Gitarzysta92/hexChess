import { ActionType } from "../constants/action-type";
import { ActionTargetType } from "../constants/target-type";

export interface MoveAction {
  type: ActionType.Move;
  targetType: ActionTargetType;
  value: number;
}