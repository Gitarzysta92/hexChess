import { GameModeType } from "src/app/constants/game-mode-type.enum";
import { Profile } from "../../my-profile/models/profile";

export interface ArmyAssignment {
  armyId: string;
  profileId: string
}



export class GameData {
  id: string;
  type: GameModeType;
  armyAssignments: ArmyAssignment[];
  profiles: Profile[];

  constructor(data: Partial<GameData>) {
    Object.assign(this, data);
  }
}

export type GameToken = string;

export const gameData = new GameData({ id: '839db3d1-a04a-4701-9805-52d457368d2f' });
