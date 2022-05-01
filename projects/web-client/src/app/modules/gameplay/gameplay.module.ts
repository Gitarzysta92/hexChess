import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BoardTileComponent } from './components/board-tile/board-tile.component';
import { BoardComponent } from './components/board/board.component';
import { PlayViewComponent } from './components/play-view/play-view.component';
import { PlayerBoardComponent } from './components/player-board/player-board.component';
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
import { CommandBusService } from './lib/command-bus/command-bus.service';


@NgModule({
  imports: [RouterModule.forChild(routes.bindComponents({
    root: PlayViewComponent
  }).toDefaultFormat())],
  exports: [RouterModule]
})
export class GameplayRoutingModule { }



@NgModule({
  declarations: [
    BoardComponent,
    BoardTileComponent,
    PlayerBoardComponent,
    PlayViewComponent,
    SceneComponent,
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
