import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadingViewComponent } from './components/loading-view/loading-view.component';





const routes: Routes = [
  { path: 'quickmatch', component: LoadingViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchmakingRoutingModule { }
