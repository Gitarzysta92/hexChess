import { MenuLocations } from 'src/app/constants/menu-locations.enum';
import { RoutesAdapter } from 'src/app/core/models/system-routes';


export const ROOT_PATH = 'lobby';
export const routes = new RoutesAdapter({
  root: { path: '',  pathMatch: 'full',  data: { menu: { location: MenuLocations.MainMenu , label: 'Lobby' } }}
})



