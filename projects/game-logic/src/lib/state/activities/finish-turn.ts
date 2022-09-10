import { Player } from "../../features/game/models/player"
import { ActivityName } from "../activity.interface"
import { DispatcherDirective } from "../game-dispatcher"
import { GameState } from "../game-state"

export const finishTurn = (): DispatcherDirective => (state: GameState, authority: Player) => {
  return {
    playerId: state.actualPlayer?.data?.id,
    turn: state.round,
    name: ActivityName.FinishTurn,
    rollback: () => ({}) as GameState
  }
}
