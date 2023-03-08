import { AttributeType } from "../../attribute/constants/attribute-type";
import { TileSide } from "../../../board/constants/tile-side";
import { AbilityType } from "../constants/ability-type";

export interface ModifyAttributeDeclarationAbility {
  value: number;
  direction: TileSide,
  attribute: AttributeType
}

export interface ModifyAttributeAbility {
  type: AbilityType.ModifyAttribute,
  modify: ModifyAttributeDeclarationAbility[];
}