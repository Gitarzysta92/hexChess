import { Tile } from "../../board/models/tile";
import { Abilities, AbilityDeclarations } from "../../capabilities/ability/interfaces/abilities";
import { AttributeDeclarations, Attributes } from "../../capabilities/attribute/interfaces/attributes";
import { TileType } from "../constants/tile-type.enum";

export class ModuleTile extends Tile implements Abilities, Attributes {

  abilities: AbilityDeclarations = [];
  attributes: AttributeDeclarations = [];

  constructor(data: Partial<ModuleTile>) {
    super(data);
    this.type = TileType.Module;
  }

}