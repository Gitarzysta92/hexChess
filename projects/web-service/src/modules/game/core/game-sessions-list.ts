import { Injectable } from "@nestjs/common";
import { GameType } from "src/modules/matchmaking/consts/game-types";

import { HashGenerator } from "src/utils/hash-generator/hash-generator/hash-generator.service";
import { GameSession, PlayerArmyAssignment} from "./game-session";



@Injectable()
export class HexGameService {
  new(a: any) {
    return { checksum: 'asd' };
  }
}

export interface GameRequest {
  roomId: string;
  gameType: GameType; 
  armyAssignments: PlayerArmyAssignment[];
  timestamp: number;
}

@Injectable()
export class GameSessionsList {

  private _sessions: { [key: string]: GameSession } = {};

  constructor(
    private readonly _hexGame: HexGameService,
  ) { }

  addSession(request: GameRequest, hash: string) { 
    
    const gameState = this._hexGame.new(request.armyAssignments);
    const gameSession = new GameSession();
    gameSession.id = hash;
    gameSession.gameState = gameState;
    gameSession.armyAssignments = request.armyAssignments;

    this._sessions[hash] = gameSession;
  }

  getSession(key: string): GameSession {
    return this._sessions[key];
  }

  deleteSession(request: GameRequest) {

  }
}
