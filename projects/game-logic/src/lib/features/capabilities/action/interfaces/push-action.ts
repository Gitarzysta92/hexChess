import { ActionType } from "../constants/action-type";
import { ActionTargetType } from "../constants/target-type";

export interface PushAction {
  type: ActionType.Push;
  targetType: ActionTargetType;
}