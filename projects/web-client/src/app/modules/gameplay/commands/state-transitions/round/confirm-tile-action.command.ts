// import { BaseCommand } from "../../../lib/command-bus/base-command";
// import { Revertable } from "../../../lib/commands-stack/commands-stack.service";
// import { StateTransition, ValidatableState } from "../../../lib/state-machine/state";
// import { RoundState } from "../../../state/round/round-state";
// import { roundStateName, RoundStateName } from "../../../state/round/round-state-name.enum";

import { BaseCommand } from "src/app/aspects/services/commands/command-bus/base-command";
import { Revertable } from "src/app/aspects/services/commands/commands-stack/commands-stack.service";


export class ConfirmTileAction extends BaseCommand implements Revertable {
  execute(): void {
    throw new Error("Method not implemented.");
  }
  revert: () => void;

  // newState: RoundState;
  // targetStateName: RoundStateName = roundStateName.TilesManage;

  // constructor(
  //   private readonly _currentState: RoundState
  // ) {
  //   super();
  //   this.newState = this._currentState.clone();
  // } 
  
  // execute(): void { 
  //   this.newState.apply();
  // }

  // revert(): void { }

  // checkIfTransitionPossible(state: ValidatableState<RoundState>): boolean {
  //   this.newState.setState(this.targetStateName);
  //   return state.to(this.newState);
  // }
}