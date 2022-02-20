import { Injectable } from '@angular/core';
import { BaseCommand } from '../../lib/command-bus/base-command';
import { CommandBusMapper } from '../../lib/command-bus/command-bus.service';
import { StateTransition } from '../../lib/state-machine/state';


@Injectable({
  providedIn: 'root'
})
export class LoggerService implements CommandBusMapper<BaseCommand | StateTransition<any, unknown>> {

  constructor() { }

  map(command: BaseCommand | StateTransition<any, unknown>) {

    if ('execute' in command) {
      const commandMethod1 = command.execute;

      command.execute = () => {
        commandMethod1.call(command);
        console.log('handler', command);
      }
    }
    


    if ('checkIfTransitionPossible' in command) {
      const commandMethod2 = command.checkIfTransitionPossible;

      command.checkIfTransitionPossible = (...args) => {
        const result = commandMethod2.call(command, ...args);  

        console.log('filter:', result ? 'passed' : 'rejected', command);
        return result;
      }
    }

    return command as BaseCommand;
  }
}

