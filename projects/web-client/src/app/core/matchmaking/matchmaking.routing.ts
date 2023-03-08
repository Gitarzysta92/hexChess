import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';
import { MatchmakingDataResolver } from './resolvers/matchmaking-data.resolver';

export namespace Matchmaking {
  export const ROOT_PATH = 'matchmaking';
  export const routes = new RoutesAdapter({
    quickmatch: { path: 'quickmatch', resolve: { data: MatchmakingDataResolver } },
    hotseat: { path: 'hotseat' }
  });
}
