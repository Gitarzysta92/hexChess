import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadingViewComponent } from './components/loading-view/loading-view.component';
import { MatchmakingViewComponent } from './components/matchmaking-view/matchmaking-view.component';



export const ROOT_PATH = 'matchmaking';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoadingViewComponent },
  { path: ':id', pathMatch: 'full', component: MatchmakingViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchmakingRoutingModule { }
