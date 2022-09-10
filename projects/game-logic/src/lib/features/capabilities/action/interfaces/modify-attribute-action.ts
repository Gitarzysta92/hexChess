import { Coord } from "../../../board/interfaces/coords";
import { AttributeType } from "../../attribute/constants/attribute-type";
import { ActionType } from "../constants/action-type";
import { ActionTargetType } from "../constants/target-type";

export type ModifyAttributeAction = ModifyAttributeActionDefinition & ModifyAttributeActionPayload;

export interface ModifyAttributeActionDefinition {
  type: ActionType.ModifyAttribute;
  attribute: AttributeType;
  targetType: ActionTargetType;
  value: number;
}

export interface ModifyAttributeActionPayload {
  coords: Coord[];
}