import { Tile } from "../../board/models/tile";
import { ActionDeclarations, Actions } from "../../capabilities/action/interfaces/actions";
import { TileType } from "../constants/tile-type.enum";


export class ActionTile extends Tile implements Actions {
  type = TileType.Action;
  actions!: ActionDeclarations;

  constructor(data: Partial<ActionTile>) {
    super(data);
  }
}