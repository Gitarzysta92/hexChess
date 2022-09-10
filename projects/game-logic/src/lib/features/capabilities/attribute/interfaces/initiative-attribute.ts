import { AttributeType } from "../constants/attribute-type";

export interface InitiativeAttribute {
  type: AttributeType.Initiative;
  initiative: number;
  baseInitiative: number;
}
