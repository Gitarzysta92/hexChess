import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BoardTileComponent } from './components/board-tile/board-tile.component';
import { BoardComponent } from './components/board/board.component';
import { MyGamesWidgetComponent } from './components/my-games-widget/my-games-widget.component';
import { PlayViewComponent } from './components/play-view/play-view.component';
import { PlayerBoardComponent } from './components/player-board/player-board.component';
import { GameplayRoutingModule, ROOT_PATH, routes } from './gameplay.routing';
import { BoardService } from './services/board-service/board.service';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    MyGamesWidgetComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    MyGamesWidgetComponent,
  ],
})
export class GameplaySharedModule { }



@NgModule({
  declarations: [
    BoardComponent,
    BoardTileComponent,
    PlayerBoardComponent,
    PlayViewComponent
  ],
  imports: [
    SharedModule,
    DragDropModule,
    GameplayRoutingModule
  ],
  providers: [
    BoardService
  ]
})
export class GameplayModule { 
  static path = ROOT_PATH;
  static routes = routes;
}
