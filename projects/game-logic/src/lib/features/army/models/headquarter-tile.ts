
import { AbilityType } from "../../capabilities/ability/constants/ability-type";
import { Abilities } from "../../capabilities/ability/interfaces/abilities";
import { AttributeType } from "../../capabilities/attribute/constants/attribute-type";
import { Attributes } from "../../capabilities/attribute/interfaces/attributes";
import { TileType } from "../constants/tile-type.enum";
import { UnitTile } from "./unit-tile";

export class HeadquarterTile extends UnitTile implements Abilities, Attributes {

  constructor(data: Partial<HeadquarterTile>) {
    super(data);
    data.type = TileType.Headquarter;
    data.attributes = [
      { type: AttributeType.Initiative, initiative: 1, baseInitiative: 1 },
      { type: AttributeType.Toughness, toughness: 20, wounds: 0}
    ]
    data.copiesInStack = 1;
  }
}