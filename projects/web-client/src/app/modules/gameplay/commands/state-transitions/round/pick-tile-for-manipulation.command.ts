import { Injectable } from "@angular/core";
import { BaseCommand } from "src/app/aspects/services/commands/command-bus/base-command";
import { Revertable } from "src/app/aspects/services/commands/commands-stack/commands-stack.service";
// import { BaseCommand, Command } from "../../../lib/command-bus/base-command";
// import { Revertable } from "../../../lib/commands-stack/commands-stack.service";
// import { StateTransition, ValidatableState } from "../../../lib/state-machine/state";
// import { RoundState } from "../../../state/round/round-state";
// import { roundStateName, RoundStateName } from "../../../state/round/round-state-name.enum";

@Injectable()
export class PickTileForManipulation extends BaseCommand implements Revertable {
  execute(): void {
    throw new Error("Method not implemented.");
  }
  revert: () => void;

  // newState: RoundState;
  // targetStateName: RoundStateName = roundStateName.TileManipulation

  // constructor(
  //   private readonly _currentState: RoundState
  // ) {
  //   super();
  //   this.newState = this._currentState.clone();
  // } 

  // setParameters(tileId: string): Command<this> {
  //   this.newState.setActivity({ name: 'PickTileFromTheBoard', tileId });
  //   return this;
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