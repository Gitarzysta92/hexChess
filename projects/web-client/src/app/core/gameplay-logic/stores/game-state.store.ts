import { Injectable } from '@angular/core';
import { ArmyHelper } from '@hexchess-game-logic/lib/features/army/army-helper';
import { CoordsHelper } from '@hexchess-game-logic/lib/features/board/coords-helper';
import { GameHelper } from '@hexchess-game-logic/lib/features/game/game-helper';
import { StateGenerator } from '@hexchess-game-logic/lib/state/state-generator';
import { GameConfiguration } from '@hexchess-game-logic/lib/features/game/models/game-configuration';
import { GameState } from '@hexchess-game-logic/lib/state/game-state';
import { Store, StoreService } from 'src/app/infrastructure/data-store/api';

export const gameStateStore = Symbol('game-state-store');

@Injectable()
export class GameStateStore {
  private _stateGenerator: StateGenerator;

  public get state() { return this._state.state };
  public get currentState() { return this._state.currentState; }

  private _state: Store<GameState>;

  constructor(
    private readonly _store: StoreService,
  ) {
    this._stateGenerator = new StateGenerator(ArmyHelper, CoordsHelper, GameHelper);
  }

  public registerStore(stateCfg: GameConfiguration): void {
    this._state = this._store.createStore<GameState>(gameStateStore, {
      initialState: this._stateGenerator.createInitialState(stateCfg),
      actions: {}
    });
  }
}