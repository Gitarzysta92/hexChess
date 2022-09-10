import { Player } from "../../features/game/models/player"
import { ActivityName } from "../activity.interface"
import { DispatcherDirective } from "../game-dispatcher"
import { GameState } from "../game-state"

export const leaveGame = (): DispatcherDirective => (state: GameState, authority: Player) => {
  return {
    playerId: authority.id,
    turn: state.round,
    name: ActivityName.Surrender,
    rollback: () => ({}) as GameState
  }
}

