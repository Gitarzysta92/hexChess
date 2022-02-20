import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SocketIoConfig, SocketIoModule } from 'src/app/utils/ng-web-sockets/ng-web-sockets.module';
import { environment } from 'src/environments/environment';

import { LoadingViewComponent } from './components/loading-view/loading-view.component';
import { MatchmakingViewComponent } from './components/matchmaking-view/matchmaking-view.component';
import { PlayerBadgeComponent } from './components/player-badge/player-badge.component';
import { routes } from './matchmaking.routing';
import { MatchmakingSharedModule } from './matchmaking.shared-module';


@NgModule({
  imports: [RouterModule.forChild(routes.bindComponents({
    root: LoadingViewComponent,
    matchmaking: MatchmakingViewComponent
  }).toDefaultFormat())],
  exports: [RouterModule]
})
export class MatchmakingRoutingModule { }


@NgModule({
  declarations: [
    LoadingViewComponent,
    MatchmakingViewComponent,
    PlayerBadgeComponent,
  ],
  imports: [
    MatchmakingRoutingModule,
    MatchmakingSharedModule,
    SharedModule,
    SocketIoModule.config({ url: environment.matchmakingSocket })
  ]
})
export class MatchmakingModule {}
