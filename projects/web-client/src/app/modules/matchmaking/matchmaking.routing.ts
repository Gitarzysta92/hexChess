import { RoutesAdapter } from 'src/app/core/models/system-routes';
import { MatchmakingDataResolver } from './resolvers/matchmaking-data.resolver';

export const ROOT_PATH = 'matchmaking';
export const routes = new RoutesAdapter({
  quickmatch: { path: 'quickmatch', resolve: { data: MatchmakingDataResolver } },
  hotseat: { path: 'hotseat' }
});