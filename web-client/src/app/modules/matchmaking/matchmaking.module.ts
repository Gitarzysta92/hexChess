import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoadingViewComponent } from './components/loading-view/loading-view.component';
import { MatchmakingRoutingModule } from './matchmaking.routing';
import { GameSessionService } from './services/game-session/game-session.service';



@NgModule({
  declarations: [
    LoadingViewComponent
  ],
  imports: [
    SharedModule,
    MatchmakingRoutingModule
  ],
  providers: [
    GameSessionService
  ]
})
export class MatchmakingModule { }
