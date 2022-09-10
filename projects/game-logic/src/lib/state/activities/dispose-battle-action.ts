import { ActionTile } from "../../features/army/models/action-tile";
import { battleResolver } from "../../features/battle/mutators/battle-resolver";
import { Player } from "../../features/game/models/player";
import { ActivityName } from "../activity.interface";
import { DispatcherDirective } from "../game-dispatcher";
import { GameState, GameStateName } from "../game-state";

export const disposeBattleActionTile = (tile: ActionTile): DispatcherDirective => (state: GameState, authority: Player) => {

  state.name = GameStateName.Battle;
  state.battleResolver = battleResolver(state.board, state.effects);

  return [
    {
      playerId: state.actualPlayer?.data?.id,
      turn: state.round,
      name: ActivityName.DisposeActionTile,
      rollback: () => ({}) as GameState
    },
    {
      playerId: state.actualPlayer?.data?.id,
      turn: state.round,
      name: ActivityName.FinishTurn,
      rollback: () => ({}) as GameState
    }
  ];
}