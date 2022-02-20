import { Injectable } from '@angular/core';
import { Collection, StoreService } from 'src/app/core';

import { GameSummary } from '../models/game-summary';


const addGameSummary = Symbol('addGameSummary');

@Injectable({ providedIn: 'root'})
export class GamesSummaryStore { 

  public get state() { return this._collection.state };

  private _collection: Collection<GameSummary[]>;

  constructor(
    private readonly _store: StoreService
  ) {
    this._registerStore();
  }

  public add(notification: GameSummary): void {
    this._collection.dispatch<GameSummary>(addGameSummary, notification);
  }

  private _registerStore() {
    this._collection = this._store.register<GameSummary[]>(Symbol('games-summary'), () => {
      return {
        initialState: [ new GameSummary({ victory: true }), new GameSummary({ victory: false }) ],
        actions: { [addGameSummary]: { action: this._addGameSummary } } 
      }
    });
  }

  private _addGameSummary = (n: GameSummary, state: GameSummary[]): GameSummary[] => [n, ...state];
}