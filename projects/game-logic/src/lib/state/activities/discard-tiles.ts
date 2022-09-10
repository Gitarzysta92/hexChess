import { TileId } from "../../features/board/aliases/tile-id";
import { Player } from "../../features/game/models/player";
import { removeTilesFromPlayable } from "../../features/game/mutators/remove-tiles-from-playable";
import { ActivityName } from "../activity.interface";
import { DispatcherDirective } from "../game-dispatcher";
import { GameState } from "../game-state";


export const discardTiles = (tileIds: TileId[]): DispatcherDirective => (state: GameState, authority: Player) => {
  removeTilesFromPlayable(state.actualPlayer, tileIds, state.utilizedTiles);
  return {
    playerId: state.actualPlayer?.data?.id,
    turn: state.round,
    name: ActivityName.DiscardTiles,
    payload: { tileIds },
    rollback: () => ({}) as GameState
  }
}