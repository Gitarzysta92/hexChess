import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainMenuViewComponent } from './components/main-menu-view/main-menu-view.component';
import { LobbyRoutingModule } from './lobby.routing';



@NgModule({
  declarations: [
    MainMenuViewComponent
  ],
  imports: [
    SharedModule,
    LobbyRoutingModule
  ],
  providers: []
})
export class LobbyModule { }
