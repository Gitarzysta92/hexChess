import { Injectable } from "@nestjs/common";
import { HashGeneratorService } from "src/shared/utils/hash-generator/hash-generator/hash-generator.service";
import { GameSessionsList } from "./game-sessions-list";

export interface StateUpdate {
  currentStateChecksum: string; 
  targetState: any;
  gameSessionKey: string;
}


@Injectable()
export class GameStateManager {

  constructor(
    private readonly _gameSessionsList: GameSessionsList,
    private readonly _hashGenerator: HashGeneratorService
  ) {}

  updateGame(stateUpdate: StateUpdate) {
    const session = this._gameSessionsList.getSession(stateUpdate.gameSessionKey);

    if (stateUpdate.currentStateChecksum !== session.gameState.checksum)
      return;

    if (!this._validateState(stateUpdate.targetState))
      return;

    session.gameState = stateUpdate.targetState;
  }

  private _validateState(a: any): boolean {
    return true;
  }
}