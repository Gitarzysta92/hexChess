import { BattleAction } from "./battle-action";
import { DestroyAction } from "./destroy-action";
import { ModifyAttributeAction } from "./modify-attribute-action";
import { MoveAction } from "./move-action";
import { PushAction } from "./push-action";

export type ActionDeclarations = Array<
  ModifyAttributeAction|
  MoveAction |
  BattleAction | 
  PushAction |
  DestroyAction>

export interface Actions {
  actions: ActionDeclarations;
}