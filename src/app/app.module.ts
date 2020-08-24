import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { BoardTileComponent } from './components/board-tile/board-tile.component';
import { PlayerBoardComponent } from './components/player-board/player-board.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardTileComponent,
    PlayerBoardComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,

  ],
  providers: [
    { provide: Window, useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
