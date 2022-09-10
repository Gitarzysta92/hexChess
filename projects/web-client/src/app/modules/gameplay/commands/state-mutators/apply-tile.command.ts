import { BaseCommand } from "src/app/aspects/services/commands/command-bus/base-command";
import { Revertable } from "src/app/aspects/services/commands/commands-stack/commands-stack.service";


export class ApplyTile extends BaseCommand implements Revertable {
  tileId!: string;
  private _intersection: any;


  constructor(
  ) {
    super();
  }

  setParameters(tileId: string): this {
    this.tileId = tileId;
    return this;
  }

  execute(): void {
    const field = this._intersection.distance;
    if (!field)
      return;
      
    //this._sceneService.attachTileToField(token, field);
  }

  revert(): void {};
  
}