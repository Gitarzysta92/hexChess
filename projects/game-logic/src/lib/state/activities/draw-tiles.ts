import { isDrawDisabledEffect } from "../../features/capabilities/effect/validators/player-draw-disabled";
import { Player } from "../../features/game/models/player";
import { addRandomTilesToPlayablesSlot } from "../../features/game/mutators/add-random-tiles-to-playable";
import { ActivityName } from "../activity.interface";
import { DispatcherDirective } from "../game-dispatcher";
import { GameState } from "../game-state";

export const drawTiles = (): DispatcherDirective => (state: GameState, authority: Player) => {

  if (!isDrawDisabledEffect(state.effects, state.actualPlayer)) {
    addRandomTilesToPlayablesSlot(state.actualPlayer, state.keepedTiles);
  }

  return {
    playerId: state.actualPlayer.data?.id,
    turn: state.round,
    name: ActivityName.DrawTiles,
    rollback: () => ({}) as GameState
  }
}
