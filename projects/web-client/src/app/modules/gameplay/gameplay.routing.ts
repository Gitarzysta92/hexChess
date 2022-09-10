import { RoutesAdapter } from 'src/app/core/models/system-routes';
import { GameDataResolver } from './resolvers/game-data.resolver';


export const ROOT_PATH = 'game';
export const routes = new RoutesAdapter({
  offline: { path: 'hotseat', pathMatch: 'full' },
  online: { path: ':id', pathMatch: 'full', resolve: { gameData: GameDataResolver } }
});