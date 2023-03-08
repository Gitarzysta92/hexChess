import { GameMode } from "@hexchess-game-logic/lib/features/game/models/game-configuration";
import { BoardType } from "../constants/board-type.enum";

export interface IGameConfiguration {
  gameMode: GameMode;
  playersNumber: number;
  isOnline: boolean;
  rules: IGameRulesConfiguration;
  board: IBoardConfiguration;
}

export interface IGameRulesConfiguration {
  startingLife: number;
  drawPerTurn: number;
  tilesToKeepPerTurn: number;
}

export interface IBoardConfiguration {
  diameter: number,
  type: BoardType; 
}