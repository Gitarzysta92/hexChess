// import { BaseCommand, Command } from "../../../lib/command-bus/base-command";
// import { StateTransition, ValidatableState } from "../../../lib/state-machine/state";
// import { SceneService } from "../../../services/scene/scene.service";
// import { RoundState } from "../../../state/round/round-state";
// import { roundStateName, RoundStateName } from "../../../state/round/round-state-name.enum";

import { BaseCommand } from "src/app/aspects/services/commands/command-bus/base-command";


export class UtilizeTile extends BaseCommand {
  execute(): void {
    throw new Error("Method not implemented.");
  }

  // newState: RoundState;
  // targetStateName: RoundStateName = roundStateName.UtilizingTile;
  
  // constructor(
  //   private readonly _sceneService: SceneService,
  //   private readonly _currentState: RoundState,
  // ) {
  //   super();
  //   this.newState = this._currentState.clone();
  // } 

  // setParameters(tileId: string): Command<this> {
  //   this.newState.setTileToUtilize(tileId);
  //   return this;
  // }

  // execute(): void {
  //   this.newState.apply();
  //   this._sceneService.createToken(this.newState.utilizingTile.img, this.newState.utilizingTile.id);
  // }

  // checkIfTransitionPossible(state: ValidatableState<RoundState>): boolean {
  //   this.newState.setState(this.targetStateName)
  //   return state.to(this.newState);
  // }
}