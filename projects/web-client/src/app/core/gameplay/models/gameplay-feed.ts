import { IPlayer } from "./player";
import { IGameDataDto } from "./game-data.dto";
import { IArmy, ITile, ITileImageBinding } from "../../armies/api";

export interface IGameplayFeed {
  armies: IArmy[],
  players: IPlayer[],
  gameData: IGameDataDto,
  tiles: ITile[],
  tileImages: ITileImageBinding[],
}