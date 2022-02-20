
import { Injectable } from "@angular/core";
import { BaseCommand } from "../../lib/command-bus/base-command";
import { CommandBusService } from "../../lib/command-bus/command-bus.service";
import { TileType } from "../../logic/consts/hierarchical-tile-types-model";
import { RoundStateService } from "../../services/round-state/round-state.service";
import { Coords, SceneService } from "../../services/scene/scene.service";
import { GameState } from "../../state/game/game-state";
import { roundStateName } from "../../state/round/round-state-name.enum";
import { CommandsFactory } from "../commands-factory";
import { ApplyTile } from "../state-mutators/apply-tile.command";
import { AssignTile } from "../state-mutators/assign-tile.command";
import { MoveTile } from "../state-mutators/move-tile.command";
import { UnassignTile } from "../state-mutators/unassign-tile.command";
import { PickTileForManipulation } from "../state-transitions/round/pick-tile-for-manipulation.command";

@Injectable()
export class MakeTileAction extends BaseCommand {
  private _coords!: Coords;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _commandBus: CommandBusService,
    private readonly _gameState: RoundStateService,
    private readonly _commandsFactory: CommandsFactory,
    private readonly _currentState: GameState
  ) {
    super();
  }
  
  setParameters(coords: Coords): this {
    this._coords = coords;
    return this;
  }

  execute(): void {
    const currentState = this._gameState.getState();
    const utilizingTile = currentState?.utilizingTile;
    const targetedField = this._sceneService.getTargetedField(this._coords);
    const tile = this._sceneService.getTile(utilizingTile.id);


    const utilizedTileShouldBeAssignedToField = utilizingTile?.type === TileType.Unit && 
      !!targetedField && currentState.stateName === roundStateName.UtilizingTile;

    if (utilizedTileShouldBeAssignedToField) {
      this._assignTile(utilizingTile.id, targetedField.id);
      this._pickTileForManipulation(utilizingTile.id);
      return;
    }


    const isTargetedInstantAction = utilizingTile?.type === TileType.InstantAction && 
    currentState.stateName === roundStateName.UtilizingTile;

    if (isTargetedInstantAction) {
      this._applyTile(utilizingTile.id);
      return;
    }
      

    const manipulatedTileShouldBeAssignedToField = utilizingTile?.type === TileType.Unit && 
      !!targetedField && currentState.stateName === roundStateName.TileManipulation && !tile?.takesField;

    if (manipulatedTileShouldBeAssignedToField) {
      this._assignTile(utilizingTile.id, targetedField.id);
      return;
    }
      

    const clickedTileShouldBeUnassignedFromField = 
      utilizingTile?.type === TileType.Unit &&
      currentState.stateName === roundStateName.TileManipulation &&
      !!tile?.takesField && targetedField?.id === tile?.takesField;

    if (clickedTileShouldBeUnassignedFromField) {
      this._unassignTile(utilizingTile.id);
      return;
    }
      
   
    const assignedTile = this._sceneService.getAssignedTile(targetedField?.id || '');
    const chooseTileForManipulation = !!assignedTile && 
      currentState.stateName === roundStateName.TilesManage;

    if (chooseTileForManipulation) {
      this._pickTileForManipulation(assignedTile.id);
      return;
    }
  }

  private _applyTile(tileId: string): void {
    const command = this._commandsFactory.create(ApplyTile).setParameters(tileId)
    this._commandBus.dispatch(command);
  }

  private _assignTile(currentTileId: string, targetFieldId: string): void {
    const command = this._commandsFactory.create(AssignTile).setParameters(currentTileId, targetFieldId);
    this._commandBus.dispatch(command);
  }

  private _unassignTile(currentTileId: string): void {
    const command = this._commandsFactory.create(UnassignTile).setParameters(currentTileId);
    this._commandBus.dispatch(command);
  }

  private _moveTile(currentTileId: string, targetFieldId: string): void {
    const command = this._commandsFactory.create(MoveTile).setParameters(currentTileId, targetFieldId);
    this._commandBus.dispatch(command);
  }

  private _pickTileForManipulation(currentTileId: string): void {
    const command = this._commandsFactory.create(PickTileForManipulation).setParameters(currentTileId);
    this._commandBus.dispatch(command);
  }

}