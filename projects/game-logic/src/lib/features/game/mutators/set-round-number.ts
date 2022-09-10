import { GameState } from "../../../state/game-state";

export function setRoundNumber(state: GameState): void {
  if (state.actualPlayer.data?.id === state.metadata.playersOrder[state.metadata.playersOrder.length - 1]) {
    state.round = state.activityStack[0]?.turn! + 1;
  }
}