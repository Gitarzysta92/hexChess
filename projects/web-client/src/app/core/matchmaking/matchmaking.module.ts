import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SOCKET_CONFIG_TOKEN, WrappedSocket } from 'src/app/utils/ng-web-sockets/ng-web-sockets.service';
import { environment } from 'src/environments/environment';
import { MatchmakingLoadingViewComponent } from './components/loading-view/loading-view.component';
import { MatchmakingViewComponent } from './components/matchmaking-view/matchmaking-view.component';
import { PlayerBadgeComponent } from './components/player-badge/player-badge.component';
import { MatchmakingSharedModule } from './matchmaking.shared-module';
import { MatchmakingService } from './services/matchmaking/matchmaking.service';
import { MatchmakingDataResolver } from './resolvers/matchmaking-data.resolver';
import { MatchmakingRoutingModule } from './matchmaking.routing-module';
import { ArmiesSharedModule } from '../armies/armies.shared-module';


@NgModule({
  declarations: [
    MatchmakingLoadingViewComponent,
    MatchmakingViewComponent,
    PlayerBadgeComponent,
  ],
  imports: [
    ArmiesSharedModule,
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
