import { AttributeType } from "../../attribute/constants/attribute-type";
import { Direction } from "../../../board/constants/tile-sides";
import { AbilityType } from "../constants/ability-type";

export interface ModifyAttributeDeclarationAbility {
  value: number;
  direction: Direction,
  attribute: AttributeType
}

export interface ModifyAttributeAbility {
  type: AbilityType.ModifyAttribute,
  modify: ModifyAttributeDeclarationAbility[];
}