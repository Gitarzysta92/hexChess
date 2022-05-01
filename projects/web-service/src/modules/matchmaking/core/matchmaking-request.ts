import { GameType } from "../consts/game-types";



export class MatchmakingRequest {
  profileId: string;
  gameType: GameType;
  selectedArmiesIds: number[];
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