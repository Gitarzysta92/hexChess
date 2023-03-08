import { ActualPlayer } from "../../game/models/actual-player";
import { BoardService } from "../board-service";
import { Coord } from "../interfaces/coords";
import { Tile } from "../models/tile";

export function putTileOnTheBoard(player: ActualPlayer, board: BoardService, tile: Tile, coord: Coord) {
  board.assingdTile(tile, coord);
  player.playablesSlot = player.playablesSlot.filter(id => id !== tile.id);
} 