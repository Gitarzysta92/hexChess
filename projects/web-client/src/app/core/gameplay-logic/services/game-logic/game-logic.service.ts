import { Injectable } from "@angular/core";
import { GameStateStore } from "../../stores/game-state.store";

@Injectable()
export class GameLogicService {

  constructor(
    private readonly _gameStateStore: GameStateStore
  ) {}

  initialize() {
    // const state = this._stateGenerator.createInitialState(cfg);
    //       this._hexChess.initialize(state, feed.myProfile as any);
    //       const hexChess = this._hexChess;
  }

  getCurrentPlayerId(): string {
    throw new Error("Method not implemented.");
  }

  startTurn(): void {
    throw new Error("Method not implemented.");
  }

  finishTurn() {
    throw new Error("Method not implemented.");
  }

}