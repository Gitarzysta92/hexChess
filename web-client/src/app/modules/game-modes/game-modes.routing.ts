import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuLocations } from 'src/app/constants/menu-locations.enum';
import { LoadingViewComponent } from './components/loading-view/loading-view.component';
import { MatchmakingViewComponent } from './components/matchmaking-view/matchmaking-view.component';


export const ROOT_PATH = 'matchmaking';

export const routes: Routes = [
  { path: 'modes', component: MatchmakingViewComponent, data: { menu: { location: MenuLocations.MainMenu, label: 'Matchmaking' } } },
  { path: 'quickmatch', component: LoadingViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchmakingRoutingModule { }
