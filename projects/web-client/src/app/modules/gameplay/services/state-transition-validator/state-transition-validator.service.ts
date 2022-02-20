import { Injectable } from '@angular/core';
import { CommandBusFilter } from '../../lib/command-bus/command-bus.service';
import { StateTransition } from '../../lib/state-machine/state';
import { RoundState } from '../../state/round/round-state';
import { RoundStateName } from '../../state/round/round-state-name.enum';
import { RoundStateService } from '../round-state/round-state.service';

@Injectable({
  providedIn: 'root'
})
export class StateTransitionValidatorService implements CommandBusFilter<StateTransition<RoundState, RoundStateName>> {

  constructor(
    private readonly _gameStateService: RoundStateService
  ) { }

  filter(command: StateTransition<RoundState, RoundStateName>): boolean {
    if (!command.checkIfTransitionPossible)
      return true;
    const currentState = this._gameStateService.getState();
    return command.checkIfTransitionPossible(currentState);
  }
}