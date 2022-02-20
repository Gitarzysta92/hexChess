import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameState } from '../../state/game/game-state';
import { gameStateName } from '../../state/game/game-state-name.enum';


@Injectable({
  providedIn: 'root'
})
export class GameStateService {  
  public onStateChange: BehaviorSubject<GameState>;

  constructor() { 
    const initState = new GameState({
      id: gameStateName.Preparation
    });

    this.onStateChange = new BehaviorSubject(initState);
  }

  applyState(state: GameState): void {
    this.onStateChange.next(state);
  }

  getState(): GameState {
    return this.onStateChange.value;
  }
}
