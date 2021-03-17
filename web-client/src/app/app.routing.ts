import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { LobbyModule } from './modules/lobby/lobby.module';
import { MatchmakingModule } from './modules/matchmaking/matchmaking.module';
import { ProfileModule } from './modules/profile/profile.module';
import { NotFoundViewComponent } from './core/components/not-found-view.component';
import { MainViewComponent } from './core/components/main-view/main-view.component';
import { MenuService } from './core/services/menu-service/menu.service';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CustomViewComponent } from './core/components/custom-view/custom-view.component';
import { GameModesModule } from './modules/game-modes/game-modes.module';
import { GameplayModule } from './modules/gameplay/gameplay.module';



const routes: Routes = [
  { path: '', 
    canActivate: [AuthenticationGuard],
    data: {
      onFailurePath: AuthenticationModule.path
    },
    children: [
      { path: MatchmakingModule.path, loadChildren: () => MatchmakingModule },
      { path: GameplayModule.path, loadChildren: () => GameplayModule },
      { 
        path: '', 
        component: MainViewComponent,
        children: [
          { path: '', pathMatch:'full', redirectTo: LobbyModule.path },
          { path: LobbyModule.path, loadChildren: () => LobbyModule },
          { path: ProfileModule.path, loadChildren: () => ProfileModule },
          { path: GameModesModule.path, loadChildren: () => GameModesModule },
          { path: NotificationsModule.path, loadChildren: () => NotificationsModule }
        ]
      },
      
    ]
  },
  { path: AuthenticationModule.path, loadChildren: () => AuthenticationModule },
  { path: '**', component: NotFoundViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    relativeLinkResolution: 'corrected',
    paramsInheritanceStrategy: 'always'
  })],
  exports: [RouterModule],
  providers: [MenuService]
})
export class AppRoutingModule { 
  constructor(
    private readonly _menuService: MenuService
  ) {
    this._menuService.register([ 
      LobbyModule, 
      ProfileModule, 
      MatchmakingModule,
      AuthenticationModule,
      NotificationsModule
    ])
  }
}

