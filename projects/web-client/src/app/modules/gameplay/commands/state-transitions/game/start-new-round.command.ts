import { Injectable } from "@angular/core";
import { BaseCommand, Command } from "../../../lib/command-bus/base-command";
import { StateTransition, ValidatableState } from "../../../lib/state-machine/state";
import { GameState } from "../../../state/game/game-state";
import { GameStateName, gameStateName } from "../../../state/game/game-state-name.enum";



@Injectable()
export class StartNewRound extends BaseCommand implements StateTransition<GameState, GameStateName> {
  
  newState: GameState;
  targetStateName: GameStateName = gameStateName.Round;
  
  constructor(
    private readonly _currentState: GameState
  ) {
    super();
    this.newState = this._currentState.clone();
  } 

  setParameters(playerId: string): Command<this> {
    return this;
  }

  execute(): void {
    this.newState.apply();
  }

  checkIfTransitionPossible(state: ValidatableState<GameState>): boolean {
    this.newState.setState(this.targetStateName);
    return state.to(this.newState);
  }
}