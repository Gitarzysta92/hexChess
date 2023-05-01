import { Injectable } from '@angular/core';
import { IMainInitializer } from 'src/app/infrastructure/configuration/models/main-initializer';
import { Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { GameSummary } from '../models/game-summary';

const addGameSummary = Symbol('addGameSummary');

@Injectable({ providedIn: 'root'})
export class GamesSummaryStore implements IMainInitializer { 

  public get state() { return this._collection.state };
  private _collection: Store<GameSummary[]>;

  constructor(
    private readonly _store: StoreService
  ) { }

  public add(notification: GameSummary): void {
    this._collection.dispatch<GameSummary>(addGameSummary, notification);
  }

  public initialize(): void {
    this._collection = this._store.createStore<GameSummary[]>(Symbol('games-summary'), {
      initialState: [ new GameSummary({ victory: true }), new GameSummary({ victory: false }) ],
      actions: {
        [addGameSummary]: {
          action: ctx => this._addGameSummary(ctx.payload, ctx.initialState)
        }
      } 
    });
  }

  private _addGameSummary = (n: GameSummary, state: GameSummary[]): GameSummary[] => [n, ...state];
}