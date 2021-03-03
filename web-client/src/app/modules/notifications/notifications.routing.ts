import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuLocations } from 'src/app/constants/menu-locations.enum';
import { NotificationsViewComponent } from './components/notifications-view/notifications-view.component';



export const ROOT_PATH = 'notifications';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'me' },
  { path: 'me', component: NotificationsViewComponent, data: { menu: { location: MenuLocations.MainMenu, label: 'Notifications' } } },
  // { path: 'friends', component: ProfileComponent, data: { menu: { location: MenuLocations.SecondaryMenu, label: 'Friends', icon: ICONS.profiles } } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
