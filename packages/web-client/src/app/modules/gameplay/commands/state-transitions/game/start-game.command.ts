import { BaseCommand, Command } from "../../../lib/command-bus/base-command";
import { StateTransition, ValidatableState } from "../../../lib/state-machine/state";
import { Player } from "../../../models/player";
import { GameState } from "../../../state/game/game-state";
import { GameStateName, gameStateName } from "../../../state/game/game-state-name.enum";



export class StartGame extends BaseCommand implements StateTransition<GameState, GameStateName> {
  
  newState: GameState;
  targetStateName: GameStateName = gameStateName.Started;
  
  constructor(
    private readonly _currentState: GameState
  ) {
    super();
    this.newState = this._currentState.clone();
  } 

  setParameters(players: Player[]): Command<this> {
    this.newState.setPlayers(players);
    return this;
  }

  execute(): void {
    this.newState.apply();
  }

  checkIfTransitionPossible(state: ValidatableState<GameState>): boolean {
    this.newState.setState(this.targetStateName)
    return state.to(this.newState);
  }
}