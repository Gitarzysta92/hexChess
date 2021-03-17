import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoadingViewComponent } from './components/loading-view/loading-view.component';
import { MatchmakingViewComponent } from './components/matchmaking-view/matchmaking-view.component';
import { MatchmakingRoutingModule, ROOT_PATH, routes } from './matchmaking.routing';
import { PlayerBadgeComponent } from './components/player-badge/player-badge.component';



@NgModule({
  declarations: [
],
  imports: [
    SharedModule,
  ],
  exports: [
  ]
})
export class MatchmakingSharedModule { }

@NgModule({
  declarations: [
    LoadingViewComponent,
    MatchmakingViewComponent,
    PlayerBadgeComponent
  ],
  imports: [
    MatchmakingRoutingModule,
    MatchmakingSharedModule,
    SharedModule,
  ]
})
export class MatchmakingModule {
  static path = ROOT_PATH;
  static routes = routes;
}
