import { Player } from "../../features/game/models/player";
import { addHeadquarterToPlayablesSlot } from "../../features/game/mutators/add-headquarter-to-playable";
import { setNextPlayer } from "../../features/game/mutators/set-next-player";
import { setRoundNumber } from "../../features/game/mutators/set-round-number";
import { ActivityName } from "../activity.interface";
import { DispatcherDirective } from "../game-dispatcher";
import { GameState, GameStateName } from "../game-state";


export const startHeadquarterTurn = (): DispatcherDirective => (state: GameState, authority: Player) => {

  state.name = GameStateName.HeadquarterRound;
  setRoundNumber(state);
  setNextPlayer(state.actualPlayer, state.players, state.metadata);
  addHeadquarterToPlayablesSlot(state.actualPlayer, state.keepedTiles);
  
  state.actualPlayer.numberOfTilesToKeep = 1;

  return [
    {
      playerId: state.actualPlayer?.data?.id,
      turn: state.round,
      name: ActivityName.StartTurn
    },
    {
      playerId: state.actualPlayer.data?.id,
      turn: state.round,
      name: ActivityName.DrawHeadquarter,
      rollback: () => ({}) as GameState
    }
  ]
}
