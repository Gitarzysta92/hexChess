import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LobbyRoutingModule, ROOT_PATH, routes } from './lobby.routing';
import { LobbyViewComponent } from './components/lobby-view/lobby-view.component';
import { TileComponent } from './components/tile/tile.component';
import { GameSharedModule } from '../game/game.module';
import { NotificationsSharedModule } from '../notifications/notifications.module';



@NgModule({
  declarations: [
    LobbyViewComponent,
    TileComponent,
  ],
  imports: [
    SharedModule,
    LobbyRoutingModule,
    GameSharedModule,
    NotificationsSharedModule
  ],
  providers: []
})
export class LobbyModule {
  static path = ROOT_PATH;
  static routes = routes;
}
