import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { MainViewComponent, MenuService, NotFoundViewComponent } from './modules/main';


import { MainResolver } from './core';
import { Lobby } from './modules/lobby';
import { MyProfile } from './modules/my-profile';
import { GameModes } from './modules/game-modes';
import { Notifications } from './modules/notifications';
import { Matchmaking } from './modules/matchmaking';
import { Gameplay } from './modules/gameplay';
import { Authentication } from './modules/authentication';


const routes: Routes = [
  { 
    path: '', 
    canActivate: [Authentication.guard],
    data: {
      onFailurePath: Authentication.ROOT_PATH
    },
    resolve: { MainResolver },
    children: [
      { path: Matchmaking.ROOT_PATH, loadChildren: () => import('./modules/matchmaking/matchmaking.module').then(m => m.MatchmakingModule) },
      { path: Gameplay.ROOT_PATH, loadChildren: () => import('./modules/gameplay/gameplay.module').then(m => m.GameplayModule) },
      { 
        path: '', 
        component: MainViewComponent,
        children: [
          { path: '', pathMatch:'full', redirectTo: Lobby.ROOT_PATH },
          { path: Lobby.ROOT_PATH, loadChildren: () => import('./modules/lobby/lobby.module').then(m => m.LobbyModule) },
          { path: MyProfile.ROOT_PATH, loadChildren: () => import('./modules/my-profile/my-profile.module').then(m => m.MyProfileModule) },
          { path: GameModes.ROOT_PATH, loadChildren: () => import('./modules/game-modes/game-modes.module').then(m => m.GameModesModule) },
          { path: Notifications.ROOT_PATH, loadChildren: () => import('./modules/notifications/notifications.module').then(m => m.NotificationsModule) }
        ]
      },
    ]
  },
  { path: Authentication.ROOT_PATH, loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: '**', component: NotFoundViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    relativeLinkResolution: 'corrected',
    paramsInheritanceStrategy: 'always',
    preloadingStrategy: NoPreloading
  })],
  exports: [RouterModule],
  providers: [MenuService]
})
export class AppRoutingModule { 
  constructor(
    private readonly _menuService: MenuService
  ) {
    this._menuService.register([ 
      { routes: Lobby.routes.toDefaultFormat(), path: Lobby.ROOT_PATH },
      { routes: MyProfile.routes.toDefaultFormat(), path: MyProfile.ROOT_PATH },
      { routes: Notifications.routes.toDefaultFormat(), path: Notifications.ROOT_PATH },
      { routes: Matchmaking.routes.toDefaultFormat(), path: Matchmaking.ROOT_PATH },
      { routes: Authentication.routes.toDefaultFormat(), path: Authentication.ROOT_PATH }
    ])
  }
}

