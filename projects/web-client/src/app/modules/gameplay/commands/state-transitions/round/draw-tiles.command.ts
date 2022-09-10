// import { Injectable } from "@angular/core";
// import { BaseCommand } from "../../../lib/command-bus/base-command";
// import { Revertable } from "../../../lib/commands-stack/commands-stack.service";
// import { StateTransition, ValidatableState } from "../../../lib/state-machine/state";
// import { RoundState } from "../../../state/round/round-state";
// import { roundStateName, RoundStateName } from "../../../state/round/round-state-name.enum";

import { Injectable } from "@angular/core";
import { BaseCommand } from "src/app/aspects/services/commands/command-bus/base-command";
import { Revertable } from "src/app/aspects/services/commands/commands-stack/commands-stack.service";



@Injectable()
export class DrawTiles extends BaseCommand implements Revertable {
  revert: () => void;
  execute(): void {
    throw new Error("Method not implemented.");
  }

  // newState: RoundState;
  // targetStateName: RoundStateName = roundStateName.ChoosingTileToDiscard;

  // constructor(
  //   private readonly _currentState: RoundState
  // ) {
  //   super();
  //   this.newState = this._currentState.clone();
  // } 
  
  // execute(): void {
  //   this.newState.apply();
  // }

  // revert() { 
  //   this._currentState.apply();
  // }

  // checkIfTransitionPossible(state: ValidatableState<RoundState>): boolean {
  //   this.newState.setState(this.targetStateName);
  //   return state.to(this.newState);
  // }
}