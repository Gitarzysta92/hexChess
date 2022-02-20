import { BaseCommand } from "../../../lib/command-bus/base-command";
import { Revertable } from "../../../lib/commands-stack/commands-stack.service";
import { StateTransition, ValidatableState } from "../../../lib/state-machine/state";
import { RoundState } from "../../../state/round/round-state";
import { roundStateName, RoundStateName } from "../../../state/round/round-state-name.enum";


export class ConfirmTileAction extends BaseCommand implements StateTransition<RoundState, RoundStateName>, Revertable {

  newState: RoundState;
  targetStateName: RoundStateName = roundStateName.Ended;

  constructor(
    private readonly _currentState: RoundState
  ) {
    super();
    this.newState = this._currentState.clone();
  } 
  
  execute(): void { 
    this.newState.apply();
  }

  revert(): void { }

  checkIfTransitionPossible(state: ValidatableState<RoundState>): boolean {
    this.newState.setState(this.targetStateName);
    return state.to(this.newState);
  }
}