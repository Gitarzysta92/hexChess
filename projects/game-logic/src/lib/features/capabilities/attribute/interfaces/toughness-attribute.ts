import { AttributeType } from "../constants/attribute-type";

export interface ToughnessAttribute {
  type: AttributeType.Toughness;
  toughness: number;
  wounds: number;
}