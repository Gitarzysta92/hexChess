
import { Injectable } from "@angular/core";
import { BaseCommand } from "../../lib/command-bus/base-command";
import { CommandBusService } from "../../lib/command-bus/command-bus.service";
import { RoundStateService } from "../../services/round-state/round-state.service";
import { Coords, SceneService } from "../../services/scene/scene.service";
import { CommandsFactory } from "../commands-factory";

@Injectable()
export class ProceedGame extends BaseCommand {
  private _coords!: Coords;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _commandBus: CommandBusService,
    private readonly _gameState: RoundStateService,
    private readonly _commandsFactory: CommandsFactory
  ) {
    super();
  }
  
  setParameters(coords: Coords): this {
    this._coords = coords;
    return this;
  }

  execute(): void {



    // if (command.targetStateName !== command.newState.stateName)
    //   return;

    // const a = gameStateTransitionRules[command.targetStateName][gameStateName.Ended]
    //   .validate(command.newState);

    // const b = gameStateTransitionRules[command.targetStateName][gameStateName.Battle]
    //   .validate(command.newState);

    // let newCommand;
    // if (a) {
    //   newCommand = this._command
    //     .create(ContinueGame)
    //     .setParameters(tileToDiscard);
    // } else if (b) {
    //   newCommand = this._command
    //     .create(ContinueGame)
    //     .setParameters(tileToDiscard);
    // } else {
    //   newCommand = this._command
    //     .create(ContinueGame)
    //     .setParameters(tileToDiscard);
  }
  
}