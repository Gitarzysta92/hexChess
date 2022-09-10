import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayViewComponent } from './components/play-view/play-view.component';
import { routes } from './gameplay.routing';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { GameModesSharedModule } from '../game-modes';
import { GameDataResolver } from './resolvers/game-data.resolver';
import { SceneComponent } from './components/scene/scene.component';
// import { SceneService } from './services/scene/scene.service';
// import { TilesRepositoryService } from './services/tiles-repository/tiles-repository.service';
// import { GameplayService } from './services/gameplay/gameplay.service';
import { SOCKET_CONFIG_TOKEN, WrappedSocket } from 'src/app/utils/ng-web-sockets/ng-web-sockets.service';
import { environment } from 'src/environments/environment';
import { PlayersOrderComponent } from './components/players-order/players-order.component';
import { PlayersScoreComponent } from './components/players-score/players-score.component';
import { PlayerControlComponent } from './components/player-control/player-control.component';
import { GameplayCaptionComponent } from './components/gameplay-caption/gameplay-caption.component';
import { GameplayLogComponent } from './components/gameplay-log/gameplay-log.component';
import { GameMenuComponent } from './components/game-menu/game-menu.component';
import { GameExitConfirmationModalComponent } from './components/game-exit-confirmation-modal/game-exit-confirmation-modal.component';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { OfflinePlayViewComponent } from './components/offline-play-view/offline-play-view.component';



@NgModule({
  imports: [RouterModule.forChild(routes.bindComponents({
    online: PlayViewComponent,
    offline: OfflinePlayViewComponent
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
    GameExitConfirmationModalComponent,
    OfflinePlayViewComponent
  ],
  imports: [
    SharedModule,
    DragDropModule,
    GameplayRoutingModule,
    GameModesSharedModule
  ],
  providers: [
    GameDataResolver,
    //SceneService,
    //TilesRepositoryService,
    //GameplayService,
    ModalService,
    WrappedSocket,
    { provide: SOCKET_CONFIG_TOKEN, useValue: { url: environment.matchmakingSocket } },
    // {
    //   provide: RoundState,
    //   useFactory: (r: RoundStateService) => r.getState(),
    //   deps: [RoundStateService]
    // },
    // {
    //   provide: GameState,
    //   useFactory: (gameStateService: GameStateService) => gameStateService.getState(),
    //   deps: [GameStateService]
    // }
  ]
})
export class GameplayModule { }
