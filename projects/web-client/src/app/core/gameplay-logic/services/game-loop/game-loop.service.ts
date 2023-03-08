import { Injectable } from '@angular/core';
import { TileObject } from '@hexchess-3d-scene/lib/actors/game-objects/tile.game-object';
import { GameState } from '@hexchess-game-logic/lib/state/game-state';
import { firstValueFrom } from 'rxjs';
import { CommandsFactory } from 'src/app/aspects/commands/commands-factory';
import { SceneInteractionService } from 'src/app/core/gameplay-scene/api';
import { PutTileOnBoard } from '../../../gameplay/commands/high-order/put-tile-on-board.command';
import { StartGame } from '../../../gameplay/commands/high-order/start-game.command';
import { FinishTurn } from '../../../gameplay/commands/state-transitions/finish-turn.command';
import { SelectTiles } from '../../../gameplay/commands/state-transitions/select-tiles.command';
import { StartNewTurn } from '../../../gameplay/commands/state-transitions/start-new-turn.command';
import { GameplayService } from '../../../gameplay/services/gameplay/gameplay.service';


@Injectable()
export class GamepLoopService {

  constructor(
    private readonly _gameplayService: GameplayService,
    private readonly _command: CommandsFactory,
    private readonly _sceneInteractionService: SceneInteractionService
  ) { }

  public async initializeOfflineGameLoop(gameState: GameState): Promise<void> {
    await this._command.create(StartGame).dispatch();

    while (gameState.winnerId === null) {
      await firstValueFrom(this._command.create(StartNewTurn).dispatch().finished$);
      await firstValueFrom(this._command.create(SelectTiles).dispatch().finished$);

      while (gameState.actualPlayer.playablesSlot.length > 0) {
        let result;
        if (gameState.round === 1) {
          result = await firstValueFrom(this._sceneInteractionService.listenForTileHandledFromStaging());
        } else {
          result = await Promise.any([
            firstValueFrom(this._sceneInteractionService.listenForTileHandledFromStaging()),
            firstValueFrom(this._gameplayService.playerTurnFinished$)
          ]);
        }

        if (result instanceof TileObject) {
          await firstValueFrom(await this._command.create(PutTileOnBoard)
            .setParameters(result as TileObject)
            .dispatch()
            .finished$);
        } else {
          break;
        }
      }
  
      await this._command.create(FinishTurn).dispatch();
    }
  } 
}