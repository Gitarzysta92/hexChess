import { GameType } from "../constants/game-types";



export class MatchmakingRequest {
  profileId: string;
  gameType: GameType;
  selectedArmiesIds: string[];
  playersNumber: number;
  timestamp: number;
 
  constructor(data: Partial<MatchmakingRequest>) {
    Object.assign(this, data);

    this.timestamp = Date.now()
  }

  getHash(): string {
    return '';
  }

  compare(hash: string): string {
    return '';
  }

}