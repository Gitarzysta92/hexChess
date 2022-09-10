import { InitiativeAttribute } from "./initiative-attribute";
import { ToughnessAttribute } from "./toughness-attribute";

export type AttributeDeclarations = Array<ToughnessAttribute | InitiativeAttribute>

export interface Attributes {
  attributes: AttributeDeclarations;
}