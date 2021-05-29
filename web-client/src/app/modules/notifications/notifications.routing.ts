import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';
import { MenuLocations } from 'src/app/constants/menu-locations.enum';
import { SystemRoutes } from 'src/app/core/models/system-routes';
import { NotificationsViewComponent } from './components/notifications-view/notifications-view.component';
import { SystemNotification } from './models/notification';
import { notificationsStore } from './services/notifications.store';


export const ROOT_PATH = 'notifications';
export const routes: SystemRoutes = [
  { path: '', pathMatch: 'full', redirectTo: 'me' },
  { path: 'me', component: NotificationsViewComponent, data: { 
    menu: { location: MenuLocations.MainMenu, label: 'Notifications' },
    appendix: { data: (store => store.get<SystemNotification[]>(notificationsStore).state.pipe(map(ns => ns.filter(n => !n.readed).length))) } 
  }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
