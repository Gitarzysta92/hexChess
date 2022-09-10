import { resolveEffectModifyPlayerDraw as resolveModifyPlayerDrawEffect } from "../../features/capabilities/effect/mutators/modify-player-draw.effect";
import { updateEffects } from "../../features/capabilities/effect/mutators/update-effects";
import { Player } from "../../features/game/models/player";
import { setNextPlayer } from "../../features/game/mutators/set-next-player";

import { setRoundNumber } from "../../features/game/mutators/set-round-number";
import { ActivityName } from "../activity.interface";
import { DispatcherDirective } from "../game-dispatcher";
import { GameState, GameStateName } from "../game-state";


export const startTurn = (): DispatcherDirective => (state: GameState, authority: Player) => {

  state.name = GameStateName.Round;

  setRoundNumber(state);
  setNextPlayer(state.actualPlayer, state.players, state.metadata);
  updateEffects(state.effects);
  resolveModifyPlayerDrawEffect(state.effects, state.actualPlayer);

  return {
    playerId: state.actualPlayer?.data?.id,
    turn: state.round,
    name: ActivityName.StartTurn
  }
}
