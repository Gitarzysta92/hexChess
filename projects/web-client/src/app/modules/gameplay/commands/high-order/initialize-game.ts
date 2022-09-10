import { Injectable } from "@angular/core";
import { BaseCommand } from "src/app/aspects/services/commands/command-bus/base-command";
import { CommandsFactory } from "src/app/aspects/services/commands/commands-factory";
import { EventBusService } from "src/app/core/services/event-bus/event-bus.service";
import { Player } from "../../models/player";


@Injectable()
export class InitializeGame extends BaseCommand {
  constructor(
    private readonly _commandBus: EventBusService,
    private readonly _command: CommandsFactory,
  ) {
    super();
  }
  
  // setParameters(players: Player[]): this {
  //   return this;
  // }

  

  execute(): void {
    // this._command.create(StartGame).setParameters(this.players).dispatch();
    // this._command.create(StartNewRound);
  }
}