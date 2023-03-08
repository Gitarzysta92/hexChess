import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameModeTileComponent } from './components/game-mode-tile/game-mode-tile.component';
import { MyGamesWidgetComponent } from './components/my-games-widget/my-games-widget.component';

@NgModule({
  declarations: [
    GameModeTileComponent,
    MyGamesWidgetComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    GameModeTileComponent,
    MyGamesWidgetComponent
  ]
})
export class GameModesSharedModule { }