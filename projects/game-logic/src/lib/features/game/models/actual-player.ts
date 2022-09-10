import { TileId } from "../../board/aliases/tile-id";
import { Action } from "../../capabilities/action/models/action";
import { Player } from "./player";

export interface ActualPlayer {
  data: Player | undefined;
  playablesSlot: TileId[];
  actionsSlot: Action[];
  availableDraw: number;
}