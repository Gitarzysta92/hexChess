import { Field } from "../../../board/interfaces/field";
import { ActionTargetType } from "../constants/target-type";


export interface ActionTargetDefinition {
  targetType: ActionTargetType;
  targetedFields: Field[];
}


export interface Action {
  targetDefinition: ActionTargetDefinition;
  affectType: ActionTargetType;
}

