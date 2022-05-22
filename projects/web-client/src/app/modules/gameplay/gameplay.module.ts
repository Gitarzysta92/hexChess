import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayViewComponent } from './components/play-view/play-view.component';
import { routes } from './gameplay.routing';
import { BoardService } from './services/board-service/board.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { GameModesSharedModule } from '../game-modes';
import { GameDataResolver } from './resolvers/game-data.resolver';
import { SceneComponent } from './components/scene/scene.component';
import { HexBoard } from './scene/objects/hex-board';
import { MakeTileAction } from './commands/high-order/make-tile-action.command';
import { SceneService } from './services/scene/scene.service';
import { CommandsFactory } from './commands/commands-factory';
import { RoundState } from './state/round/round-state';
import { GameState } from './state/game/game-state';
import { GameStateService } from './services/game-state/game-state.service';
import { RoundStateService } from './services/round-state/round-state.service';
import { TilesRepositoryService } from './services/tiles-repository/tiles-repository.service';
import { CommandBusService, DefaultCommandsHandler } from './lib/command-bus/command-bus.service';
import { GameplayService } from './services/gameplay/gameplay.service';
import { SOCKET_CONFIG_TOKEN, WrappedSocket } from 'src/app/utils/ng-web-sockets/ng-web-sockets.service';
import { environment } from 'src/environments/environment';
import { GameLoopAutoDispatcherService } from './services/game-loop-auto-dispatcher/game-loop-auto-dispatcher.service';
import { PlayersOrderComponent } from './components/players-order/players-order.component';
import { PlayersScoreComponent } from './components/players-score/players-score.component';
import { PlayerControlComponent } from './components/player-control/player-control.component';
import { GameplayCaptionComponent } from './components/gameplay-caption/gameplay-caption.component';
import { GameplayLogComponent } from './components/gameplay-log/gameplay-log.component';
import { GameMenuComponent } from './components/game-menu/game-menu.component';
import { GameExitConfirmationModalComponent } from './components/game-exit-confirmation-modal/game-exit-confirmation-modal.component';
import { ModalService } from 'src/app/shared/services/modal/modal.service';


@NgModule({
  imports: [RouterModule.forChild(routes.bindComponents({
    root: PlayViewComponent,
  }).toDefaultFormat())],
  exports: [RouterModule]
})
export class GameplayRoutingModule { }



@NgModule({
  declarations: [
    PlayViewComponent,
    SceneComponent,
    PlayerControlComponent,
    PlayersScoreComponent,
    PlayersOrderComponent,
    GameplayCaptionComponent,
    GameplayLogComponent,
    GameMenuComponent,
    GameExitConfirmationModalComponent
  ],
  imports: [
    SharedModule,
    DragDropModule,
    GameplayRoutingModule,
    GameModesSharedModule
  ],
  providers: [
    BoardService,
    GameDataResolver,
    HexBoard,
    SceneService,
    CommandsFactory,
    GameStateService,
    RoundStateService,
    TilesRepositoryService,
    CommandBusService,
    GameDataResolver,
    GameplayService,
    ModalService,
    DefaultCommandsHandler,
    WrappedSocket,
    GameLoopAutoDispatcherService,
    { provide: SOCKET_CONFIG_TOKEN, useValue: { url: environment.matchmakingSocket } },
    {
      provide: RoundState,
      useFactory: (roundStateService: RoundStateService) => roundStateService.getState(),
      deps: [RoundStateService]
    },
    {
      provide: GameState,
      useFactory: (gameStateService: GameStateService) => gameStateService.getState(),
      deps: [GameStateService]
    },
    // Commands
    MakeTileAction,
  ]
})
export class GameplayModule { }
