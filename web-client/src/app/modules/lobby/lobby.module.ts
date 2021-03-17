import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LobbyRoutingModule, ROOT_PATH, routes } from './lobby.routing';
import { LobbyViewComponent } from './components/lobby-view/lobby-view.component';

import { GameplaySharedModule } from '../gameplay/gameplay.module';
import { NotificationsSharedModule } from '../notifications/notifications.module';
import { AbstractModule } from 'src/app/core/models/AbstractModule';
import { GameModesSharedModule } from '../game-modes/game-modes.module';



@NgModule({
  declarations: [
    LobbyViewComponent,
  ],
  imports: [
    SharedModule,
    LobbyRoutingModule,
    GameplaySharedModule,
    GameModesSharedModule,
    NotificationsSharedModule
  ],
  providers: []
})
export class LobbyModule extends AbstractModule {
  static path = ROOT_PATH;
  static routes = routes;
}
