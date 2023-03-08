import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';
import { GameDataResolver } from './resolvers/game-data.resolver';

export namespace Gameplay {
  export const ROOT_PATH = 'game';
  export const routes = new RoutesAdapter({
    offline: { path: 'hotseat', pathMatch: 'full' },
    online: { path: ':id', pathMatch: 'full', resolve: { initialData: GameDataResolver } }
  });
}