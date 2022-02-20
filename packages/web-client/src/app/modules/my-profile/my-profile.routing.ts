
import { ICONS } from 'src/app/constants/icons';
import { MenuLocations } from 'src/app/constants/menu-locations.enum';
import { RoutesAdapter } from 'src/app/core/models/system-routes';


export const ROOT_PATH = 'profile';
export const routes = new RoutesAdapter({
  root: { path: '', pathMatch: 'full', redirectTo: 'me' },
  me: { path: 'me', data: { menu: { location: MenuLocations.SecondaryMenu, label: 'My profile', icon: ICONS.profile } } },
  //friends: { path: 'friends', component: ProfileComponent, data: { menu: { location: MenuLocations.SecondaryMenu, label: 'Friends', icon: ICONS.profiles } } }
});

