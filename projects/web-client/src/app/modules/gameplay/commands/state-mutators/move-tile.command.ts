import { BaseCommand } from "src/app/aspects/services/commands/command-bus/base-command";
import { Revertable } from "src/app/aspects/services/commands/commands-stack/commands-stack.service";


export class MoveTile extends BaseCommand implements Revertable {
  private _playerId!: string;

  constructor(
  ) {
    super();
  }

  setParameters(playerId: string, targetFieldId: string): this {
    this._playerId = playerId;
    return this;
  }

  execute(): void {

  }

  revert(): void {
    
  };
}