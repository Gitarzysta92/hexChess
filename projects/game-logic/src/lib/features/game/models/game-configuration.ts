export interface GameConfiguration {
  mode: GameMode;
  playersNumber: number;
  players: PlayerDeclaration[];
  startingLife: number;
  boardSize: number;
  drawPerTurn: number;
  tilesToKeepPerTurn: number;
}

export interface PlayerDeclaration {
  id: string;
  name: string;
  armyId: string;
}

export enum GameMode {
  Skirmish
}


export interface GameMetadata {
  mode: GameMode;
  playersNumber: number;
  playersOrder: string[];
  boardSize: number;
}