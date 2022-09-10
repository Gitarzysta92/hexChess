import { ActionType } from "../constants/action-type";
import { ActionTargetType } from "../constants/target-type";

export interface DestroyAction {
  type: ActionType.Destroy;
  targetType: ActionTargetType;
  value: number;
}