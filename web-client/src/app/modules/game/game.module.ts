import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BoardTileComponent } from './components/board-tile/board-tile.component';
import { BoardComponent } from './components/board/board.component';
import { PlayViewComponent } from './components/play-view/play-view.component';
import { PlayerBoardComponent } from './components/player-board/player-board.component';
import { GameRoutingModule } from './game.routing';
import { BoardService } from './services/board-service/board.service';


@NgModule({
  declarations: [
    BoardComponent,
    BoardTileComponent,
    PlayerBoardComponent,
    PlayViewComponent
  ],
  imports: [
    SharedModule,
    GameRoutingModule
  ],
  providers: [
    BoardService
  ]
})
export class GameModule { }
