import { TileId } from "../../board/aliases/tile-id";
import { Tile } from "../../board/models/tile";

export interface TileBind {
  playerId: string;
  tileId: TileId;
}