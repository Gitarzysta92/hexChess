import { GameModeType } from "src/app/constants/game-mode-type.enum";
import { Player } from "./player";

export interface ArmyAssignment {
  armyId: number;
  id: string
}



export class GameData {
  id: string;
  type: GameModeType;
  armyAssignments: ArmyAssignment[]
    

  constructor(data: Partial<GameData>) {
    Object.assign(this, data);
  }
}

export type GameToken = string;

export const gameData = new GameData({ id: '839db3d1-a04a-4701-9805-52d457368d2f' });
