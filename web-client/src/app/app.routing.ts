import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { LobbyModule } from './modules/lobby/lobby.module';
import { GameModule } from './modules/game/game.module';
import { MatchmakingModule } from './modules/matchmaking/matchmaking.module';
import { ProfileModule } from './modules/profile/profile.module';


const routes: Routes = [
  { path: '', 
    canActivate: [AuthenticationGuard],
    data: {
      onFailurePath: 'account'
    },
    children: [
      { path: '', pathMatch:'full', redirectTo:'lobby' },
      { path: 'lobby', loadChildren: () => LobbyModule },
      { path: 'profile', loadChildren: () => ProfileModule },
      { path: 'game', loadChildren: () => GameModule },
      { path: 'matchmaking', loadChildren: () => MatchmakingModule }
    ]
  },
  { path: 'account', loadChildren: () => AuthenticationModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




// const routes: Routes = [
//   { path: '', 
//     canActivate: [AuthenticationGuard],
//     data: {
//       onFailurePath: 'login'
//     },
//     children: [
//       { path: '', pathMatch:'full', redirectTo:'main-menu' },
//       { path: 'main-menu', component: MainMenuViewComponent },
//       { path: 'searching', component: LoadingViewComponent },
//       { path: 'play/:roomId', component: PlayViewComponent }
//   ]},
//   { path: 'account',  loadChildren: () => AuthenticationModule }
//   { path: 'login', component: LoginViewComponent },
//   { path: 'registration', component: RegistrationViewComponent }
// ];