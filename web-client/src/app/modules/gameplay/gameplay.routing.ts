import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayViewComponent } from './components/play-view/play-view.component';


export const ROOT_PATH = 'game';

export const routes: Routes = [
  { path: ':id',  pathMatch: 'full', component: PlayViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameplayRoutingModule { }
