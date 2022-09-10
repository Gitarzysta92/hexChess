import { BaseCommand } from "src/app/aspects/services/commands/command-bus/base-command";
import { Revertable } from "src/app/aspects/services/commands/commands-stack/commands-stack.service";



export enum RotationDirection {
  Clockwise,
  CounterClockwise
}

export class RotateTile extends BaseCommand implements Revertable {
  private _tileId!: string;
  private _direction!: RotationDirection;
  _sceneService: any;

  constructor(
  ) {
    super();
  } 

  setParameters(tileId: string, direction: RotationDirection): this {
    this._tileId = tileId;
    this._direction = direction;
    return this;
  }

  execute(): void {
    const tile = this._sceneService.getTile(this._tileId);
    this._sceneService.rotateToken(tile, this._direction === RotationDirection.Clockwise);
  }

  revert(): void {
    
  };
}