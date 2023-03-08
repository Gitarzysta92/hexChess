import { IGameConfiguration } from "../../game-modes/api";
import { IMatchmakingResult } from "../../matchmaking/api";

export interface IGameDataDto {
  gameId: string;
  configuration: IGameConfiguration;
  matchmaking: IMatchmakingResult
}