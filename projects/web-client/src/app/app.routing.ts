import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { Lobby } from './core/lobby';
import { Identity } from './core/identity/api';
import { Matchmaking } from './core/matchmaking/api';
import { Gameplay } from './core/gameplay/api';
import { MyProfile } from './core/my-profile/api';
import { GameModes } from './core/game-modes/api';
import { Notifications } from './aspects/notifications/api';
import { MainResolver } from './infrastructure/configuration/api';
import { MainViewComponent, NotFoundViewComponent } from './core/main/api';
import { MenuService } from './aspects/navigation/api';


const routes: Routes = [
  { 
    path: '', 
    canActivate: [Identity.guard],
    data: {
      onFailurePath: Identity.ROOT_PATH
    },
    resolve: { MainResolver },
    children: [
      { path: Matchmaking.ROOT_PATH, loadChildren: () => import('./core/matchmaking/matchmaking.module').then(m => m.MatchmakingModule) },
      { path: Gameplay.ROOT_PATH, loadChildren: () => import('./core/gameplay/gameplay.module').then(m => m.GameplayModule) },
      { 
        path: '', 
        component: MainViewComponent,
        children: [
          { path: '', pathMatch:'full', redirectTo: Lobby.ROOT_PATH },
          { path: Lobby.ROOT_PATH, loadChildren: () => import('./core/lobby/lobby.module').then(m => m.LobbyModule) },
          { path: MyProfile.ROOT_PATH, loadChildren: () => import('./core/my-profile/my-profile.module').then(m => m.MyProfileModule) },
          { path: GameModes.ROOT_PATH, loadChildren: () => import('./core/game-modes/game-modes.module').then(m => m.GameModesModule) },
          { path: Notifications.ROOT_PATH, loadChildren: () => import('./aspects/notifications/notifications.module').then(m => m.NotificationsModule) }
        ]
      },
    ]
  },
  { path: Identity.ROOT_PATH, loadChildren: () => import('./core/identity/identity.module').then(m => m.IdentityModule) },
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
      { routes: Identity.routes.toDefaultFormat(), path: Identity.ROOT_PATH }
    ])
  }
}