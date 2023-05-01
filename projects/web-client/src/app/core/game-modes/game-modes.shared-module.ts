import { ModuleWithProviders, NgModule } from '@angular/core';
import { MAIN_INITIALIZE } from 'src/app/infrastructure/configuration/api';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameModeTileComponent } from './components/game-mode-tile/game-mode-tile.component';
import { MyGamesWidgetComponent } from './components/my-games-widget/my-games-widget.component';
import { GamesSummaryStore } from './stores/games-summary.store';

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
export class GameModesSharedModule { 
  static forRoot(): ModuleWithProviders<GameModesSharedModule> {
    return {
      ngModule: GameModesSharedModule,
      providers: [
        { provide: MAIN_INITIALIZE, useExisting: GamesSummaryStore, multi: true },
      ]
    };
  }
}