import { Subject } from "rxjs";

//
// TODO -> use BehaviourSubject instead of plain Subject and set initial state for subject.
//


export class StateContainer<T> {

  public get value() {
    return this._currentState;
  }

  public changed: Subject<T>;
  
  private _currentState: T;
  private _states?: T[];

  constructor(initial: T, states?: T[]) {
    this.changed = new Subject();
    this._states = states;
    this._currentState = initial;
  }

  public set(value: T) {
    if (this._states && !this._states.some(s => s === value)) return;
    if (value === this._currentState) return;

    this._currentState = value;
    this.changed.next(this._currentState);
  }
}