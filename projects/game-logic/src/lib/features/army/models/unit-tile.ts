import { Tile } from "../../board/models/tile";
import { Abilities, AbilityDeclarations } from "../../capabilities/ability/interfaces/abilities";
import { AttributeType } from "../../capabilities/attribute/constants/attribute-type";
import { Attributes, AttributeDeclarations } from "../../capabilities/attribute/interfaces/attributes";
import { TileType } from "../constants/tile-type.enum";
import { ToughnessAttribute } from "../../capabilities/attribute/interfaces/toughness-attribute"
import { Direction } from "../../board/constants/tile-sides";


export class UnitTile extends Tile implements Abilities, Attributes {

  abilities: AbilityDeclarations = [];
  attributes: AttributeDeclarations = [];

  direction: Direction = Direction.Top;

  constructor(data: Partial<UnitTile>) {
    super(data);
    this.type = TileType.Unit;
    this.abilities = data.abilities || [];
    this.attributes = data.attributes || [];

  }

  attack(): any {
    
  }

  hasAttribute(type: AttributeType): boolean {
    return this.attributes.some(a => a.type === type);
  }

  modifyHealth(value: number): void {
    const t = this.attributes.find(a => a.type === AttributeType.Toughness) as ToughnessAttribute;
    t.wounds + value;
  }
  

  checkAmbiguity(): boolean {
    return true;
  }
}