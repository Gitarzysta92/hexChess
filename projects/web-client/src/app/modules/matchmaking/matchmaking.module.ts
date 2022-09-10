import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SOCKET_CONFIG_TOKEN, WrappedSocket } from 'src/app/utils/ng-web-sockets/ng-web-sockets.service';
import { environment } from 'src/environments/environment';

import { MatchmakingLoadingViewComponent } from './components/loading-view/loading-view.component';
import { MatchmakingViewComponent } from './components/matchmaking-view/matchmaking-view.component';
import { PlayerBadgeComponent } from './components/player-badge/player-badge.component';
import { routes } from './matchmaking.routing';
import { MatchmakingSharedModule } from './matchmaking.shared-module';
import { MatchmakingService } from './services/matchmaking/matchmaking.service';
import { HotseatmakingViewComponent } from './components/hotseatmaking-view/hotseatmaking-view.component';
import { MatchmakingDataResolver } from './resolvers/matchmaking-data.resolver';


@NgModule({
  imports: [RouterModule.forChild(routes.bindComponents({
    //root: MatchmakingLoadingViewComponent,
    quickmatch: MatchmakingViewComponent,
    hotseat: HotseatmakingViewComponent
  }).toDefaultFormat())],
  exports: [RouterModule],
  declarations: [
    HotseatmakingViewComponent
  ]
})
export class MatchmakingRoutingModule { }


@NgModule({
  declarations: [
    MatchmakingLoadingViewComponent,
    MatchmakingViewComponent,
    PlayerBadgeComponent,
  ],
  imports: [
    MatchmakingRoutingModule,
    MatchmakingSharedModule,
    SharedModule,
  ],
  providers: [
    { provide: SOCKET_CONFIG_TOKEN, useValue: { url: environment.matchmakingSocket } },
    WrappedSocket,
    MatchmakingService,
    MatchmakingDataResolver
  ]
})
export class MatchmakingModule {}
