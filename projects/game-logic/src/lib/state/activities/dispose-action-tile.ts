import { ActionTile } from "../../features/army/models/action-tile"
import { BoardService } from "../../features/board/board-service"
import { ActionType } from "../../features/capabilities/action/constants/action-type"
import { modifyUnitHealth } from "../../features/capabilities/action/mutators/modify-health"
import { Player } from "../../features/game/models/player"
import { ActivityName } from "../activity.interface"
import { DispatcherDirective } from "../game-dispatcher"
import { GameState } from "../game-state"
import { disposeBattleActionTile } from "./dispose-battle-action"

export const disposeActionTile = (tile: ActionTile): DispatcherDirective => (state: GameState, authority: Player) => {

  for (let action of tile.actions) {
    switch (action.type) {
      case ActionType.Battle:
        return disposeBattleActionTile(tile)(state, authority);      
      
      case ActionType.ModifyAttribute:
        modifyUnitHealth(state.board as BoardService, action);
        break;
  
      default:
        break;
    }
  }

  return [
    {
      playerId: state.actualPlayer?.data?.id,
      turn: state.round,
      name: ActivityName.DisposeActionTile,
      rollback: () => ({}) as GameState
    }
  ];  
}