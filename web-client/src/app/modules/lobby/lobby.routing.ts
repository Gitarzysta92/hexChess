import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuViewComponent } from './components/main-menu-view/main-menu-view.component';




const routes: Routes = [
  { path: '',  pathMatch: 'full', component: MainMenuViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LobbyRoutingModule { }
