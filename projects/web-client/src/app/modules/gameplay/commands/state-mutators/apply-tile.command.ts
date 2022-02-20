import { BaseCommand } from "../../lib/command-bus/base-command";
import { Revertable } from "../../lib/commands-stack/commands-stack.service";
import { SceneService } from "../../services/scene/scene.service";


export class ApplyTile extends BaseCommand implements Revertable {
  tileId!: string;
  private _intersection: any;


  constructor(
    private readonly _sceneService: SceneService,
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
      
    const token = this._sceneService.dragManager.currentObject;
    //this._sceneService.attachTileToField(token, field);
  }

  revert(): void {};
  
}