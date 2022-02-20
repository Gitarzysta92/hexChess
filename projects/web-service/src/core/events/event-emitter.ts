import { Observable, Subject, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";


export class EventEmitter<T>{
  private _target: Subject<T>;
  private _destroyed: Function[];
  private _destroy$: Subject<void>;

  constructor() {
    this._target = new Subject();
    this._destroy$ = new Subject();
    this._destroyed = [];
    EventEmitter.listeners.forEach(listener => listener(this.pipe(takeUntil(this._destroy$))));
  }

  public pipe<T>(cb: any): Observable<T> {
    return this._target.pipe(cb);
  }

  public subscribe(cb): Subscription {
    return this._target.subscribe(cb);
  }

  public destroy() {
    this._destroy$.next();
    this._destroyed.forEach(cb => cb());
  }

  public destroyed(cb: Function): void {
    this._destroyed.push(cb);  
  } 


  protected emit(value: T): void {
    this._target.next(value);
  }

  public static onInstanceCreated(cb) {
    EventEmitter.listeners.push(cb);
  }

  private static listeners: Function[] = [];
}
