import { Routes } from '@angular/router';
import { RoutesAdapter } from 'src/app/core/models/system-routes';
import { MatchmakingLoadingViewComponent } from './components/loading-view/loading-view.component';
import { MatchmakingViewComponent } from './components/matchmaking-view/matchmaking-view.component';



export const ROOT_PATH = 'matchmaking';

export const routes = new RoutesAdapter({
  root: { path: '', pathMatch: 'full', component: MatchmakingLoadingViewComponent },
  matchmaking: { path: 'quickmatch/:id', pathMatch: 'full', component: MatchmakingViewComponent }
});
