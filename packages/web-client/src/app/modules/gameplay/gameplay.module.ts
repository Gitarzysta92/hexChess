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
    HexBoard
    // GameView,
    // DragManager,
    // AnimationManager,
    // { provide: TasksQueue, useFactory: (() => {
    //   const queue = new TasksQueue();
    //   return () => queue;
    // })() }
  ]
})
export class GameplayModule { }
