import { Tile } from "../../features/board/models/tile"
import { Player } from "../../features/game/models/player"
import { ActivityName } from "../activity.interface"
import { DispatcherDirective } from "../game-dispatcher"
import { GameState } from "../game-state"

export const moveTile = (tile: Tile): DispatcherDirective => (state: GameState, authority: Player) => {
  return {
    playerId: state.actualPlayer?.data?.id!,
    turn: state.round,
    name: ActivityName.MoveTile,
    rollback: () => ({}) as GameState
  }
}
