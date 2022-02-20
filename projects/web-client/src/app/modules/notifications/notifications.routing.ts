import { map } from 'rxjs/operators';
import { MenuLocations } from 'src/app/constants/menu-locations.enum';
import { RoutesAdapter } from 'src/app/core/models/system-routes';
import { SystemNotification } from './models/notification';
import { notificationsStore } from './stores/notifications.store';




export const ROOT_PATH = 'notifications';
export const routes = new RoutesAdapter({
  root: { path: '', pathMatch: 'full', redirectTo: 'me' },
  me: { path: 'me', data: { 
    menu: { location: MenuLocations.MainMenu, label: 'Notifications' },
    appendix: { data: (store => store.get<SystemNotification[]>(notificationsStore).state.pipe(map(ns => ns.filter(n => !n.readed).length))) } 
  }}
})






