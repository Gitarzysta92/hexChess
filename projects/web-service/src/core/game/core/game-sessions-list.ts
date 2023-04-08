import { Injectable } from "@nestjs/common";
import { GameRequest } from "../models/game-request.dto";
import { GameSession } from "./game-session";

@Injectable()
export class HexGameService {
  new(a: any) {
    return { checksum: 'asd' };
  }
}

@Injectable()
export class GameSessionsList {

  private _sessions: { [key: string]: GameSession } = {};

  constructor(
    private readonly _hexGame: HexGameService,
  ) { }

  addSession(request: GameRequest, hash: string) {  
    const gameSession = new GameSession();
    gameSession.id = hash;
    this._sessions[hash] = gameSession;
  }

  getSession(key: string): GameSession {
    return this._sessions[key];
  }

  deleteSession(request: GameRequest) {

  }
}