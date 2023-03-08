import { ArmyHelper } from "../../features/army/army-helper";
import { UnitTile } from "../../features/army/models/unit-tile";
import { TileId } from "../../features/board/aliases/tile-id";
import { BoardService } from "../../features/board/board-service";
import { TileSide } from "../../features/board/constants/tile-side";
import { Coord } from "../../features/board/interfaces/coords";
import { putTileOnTheBoard } from "../../features/board/mutators/put-tile-on-the-board";
import { Player } from "../../features/game/models/player";
import { ActivityName } from "../activity.interface";
import { DispatcherDirective } from "../game-dispatcher";
import { GameState } from "../game-state";

export const deployTile = (tile: UnitTile, coords: Coord): DispatcherDirective => (state: GameState, authority: Player) => {
  

  putTileOnTheBoard(state.actualPlayer, state.board as BoardService, tile, coords);

  return {
    playerId: state.actualPlayer.data?.id,
    turn: state.round,
    name: ActivityName.DeployTile,
    payload: { tile },
    rollback: () => ({}) as GameState
  }
}