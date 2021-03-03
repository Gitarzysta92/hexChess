import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuLocations } from 'src/app/constants/menu-locations.enum';
import { LobbyViewComponent } from './components/lobby-view/lobby-view.component';


export const ROOT_PATH = 'lobby';

export const routes: Routes = [
  { path: '',  pathMatch: 'full', component: LobbyViewComponent, data: { menu: { location: MenuLocations.MainMenu , label: 'Lobby' } }},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LobbyRoutingModule { }


