import { Injectable } from "@angular/core";
import { CommandsFactory } from "../../commands/commands-factory";
import { ProceedGame } from "../../commands/high-order/proceed-game";
import { FinishRound } from "../../commands/state-transitions/round/finish-round.command";
import { CommandBusSideEffect, CommandBusService } from "../../lib/command-bus/command-bus.service";
import { StateTransition } from "../../lib/state-machine/state";
import { RoundState } from "../../state/round/round-state";
import { RoundStateName } from "../../state/round/round-state-name.enum";


@Injectable({
  providedIn: 'root'
})
export class GameLoopAutoDispatcherService implements CommandBusSideEffect<StateTransition<RoundState, RoundStateName>> {

  constructor(
    private readonly _commandBus: CommandBusService,
    private readonly _command: CommandsFactory
  ) { }

  react(command: StateTransition<RoundState, RoundStateName>): void {
    if (!(command instanceof FinishRound) || command.targetStateName !== command.newState.stateName)
      return;
    
    const newCommand = this._command.create(ProceedGame);
    this._commandBus.dispatch(newCommand);
  }
}