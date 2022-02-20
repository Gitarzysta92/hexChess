import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoundState } from '../../state/round/round-state';
import { roundStateName } from '../../state/round/round-state-name.enum';


@Injectable({
  providedIn: 'root'
})
export class RoundStateService {
  private _roundState: RoundState = new RoundState({
    name: roundStateName.Started
  });
  
  public onStateChange: BehaviorSubject<RoundState> = new BehaviorSubject(this._roundState)

  constructor() { }

  applyState(state: RoundState): void {
    this._roundState = state;
    this.onStateChange.next(this._roundState);
  }

  getState(): RoundState {
    return this._roundState;
  }
}