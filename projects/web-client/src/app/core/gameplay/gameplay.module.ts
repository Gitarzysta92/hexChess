import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GameModesSharedModule } from '../game-modes/api';
import { GameDataResolver } from './resolvers/game-data.resolver';
import { SOCKET_CONFIG_TOKEN, WrappedSocket } from 'src/app/utils/ng-web-sockets/ng-web-sockets.service';
import { environment } from 'src/environments/environment';
import { CommandBusService } from 'src/app/aspects/commands/command-bus/command-bus.service';
import { CommandsFactory } from 'src/app/aspects/commands/commands-factory';
import { CommandsQueueService } from 'src/app/aspects/commands/commands-queue/commands-queue.service';
import { CommandsStackService, RevertableCommand } from 'src/app/aspects/commands/commands-stack/commands-stack.service';
import { StartNewTurn } from './commands/state-transitions/start-new-turn.command';
import { GameplayService } from './services/gameplay/gameplay.service';
import { StartGame } from './commands/high-order/start-game.command';
import { SelectTiles } from './commands/state-transitions/select-tiles.command';
import { PutTileOnBoard } from './commands/high-order/put-tile-on-board.command';
import { DeployTile } from './commands/state-transitions/deploy-tile.command';
import { DisposeTile } from './commands/state-transitions/dispose-tile.command';
import { CommandsDefaultHandler } from 'src/app/aspects/commands/commands-default-handler/commands-defaut-handler.service';
import { GameplayLoggerService } from './services/gameplay-logger/logger.service';
import { GamepLoopService } from '../gameplay-logic/services/game-loop/game-loop.service';
import { BaseCommand } from 'src/app/aspects/commands/command-bus/base-command';
import { GameplayErrorsService } from './services/gameplay-errors/gameplay-errors.service';
import { FinishTurn } from './commands/state-transitions/finish-turn.command';
import { GameplayRoutingModule } from './gameplay.routing-module';
import { GameplayViewComponent } from './components/gameplay-view/gameplay-view.component';
import { GameplayLogicSharedModule } from '../gameplay-logic/gameplay-logic.shared-module';
import { GameplaySceneSharedModule } from '../gameplay-scene/gameplay-scene.shared-module';
import { GameplayUiSharedModule } from '../gameplay-ui/gameplay-ui.shared-module';

@NgModule({
  declarations: [
    GameplayViewComponent
  ],
  imports: [
    SharedModule,
    DragDropModule,
    GameplayRoutingModule,
    GameModesSharedModule,
    GameplayLogicSharedModule,
    GameplaySceneSharedModule,
    GameplayUiSharedModule
  ],
  providers: [
    CommandBusService,
    CommandsFactory,
    CommandsQueueService,
    CommandsStackService,
    CommandsDefaultHandler,
    GamepLoopService,
    GameDataResolver,
    GameplayService,
    GameplayLoggerService,
    GameplayErrorsService,
    WrappedSocket,
    { provide: SOCKET_CONFIG_TOKEN, useValue: { url: environment.matchmakingSocket } },
  ]
})
export class GameplayModule { 
  constructor(
    private readonly _commandsFactory: CommandsFactory,
    private readonly _commandBusService: CommandBusService,
    private readonly _gameplayLoggerService: GameplayLoggerService,
    private readonly _commandsStack: CommandsStackService,
    private readonly _defaultHandler: CommandsDefaultHandler,
    private readonly _gameplayErrorsService: GameplayErrorsService

  ) {
    // const commonDeps = [GameplayService, SceneService]

    // this._commandsFactory.initialize([
    //   { command: StartGame, deps: [...commonDeps, CommandsFactory] },
    //   { command: PutTileOnBoard, deps: [...commonDeps, CommandsFactory] },
    //   { command: StartNewTurn, deps: [GameplayService, ModalService] },
    //   { command: SelectTiles, deps: [...commonDeps] },
    //   { command: DeployTile, deps: [...commonDeps, GameplayEventsService, ModalService] },
    //   { command: DisposeTile, deps: [...commonDeps, GameplayEventsService] },
    //   { command: FinishTurn, deps: [...commonDeps] }
    // ]);

    this._commandBusService.useMapper(this._gameplayLoggerService);
    this._commandBusService.useMapper(this._gameplayErrorsService);
    this._commandBusService.useHandler<RevertableCommand>(this._commandsStack);
    this._commandBusService.useHandler<BaseCommand>(this._defaultHandler);
  }
}