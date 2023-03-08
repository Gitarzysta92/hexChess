import { Observable, filter, BehaviorSubject, from } from "rxjs";
import { StoreConfig } from "../../models/store-config";
import { StoreActionQueue } from "./store-action-queue";

export class Store<T> {
 
  public get state(): Observable<T> {
    this._initializeState();
    return this._state
      .pipe(filter(s => s != null));
  }
  public get currentState(): T { return this._state.value };
  public prevState: T;
  public changed: BehaviorSubject<any> = new BehaviorSubject(null);

  private _key: Symbol;
  private _actions: { [key: string]: any };
  private _actionsQueue: StoreActionQueue;
  private _state: BehaviorSubject<T>;
  private _isLazyLoaded: boolean;

  constructor(data: StoreConfig<T> & { key: Symbol }) {
    this._key = data.key;
    this._actions = {};

    if (data.actions) {
      for(let key of Object.getOwnPropertySymbols(data.actions) ) {
        this._actions[key as any] = Object.assign({ before: [], after: [] }, data.actions[key as any]);
      }
    }
    
    this._isLazyLoaded = data.isLazyLoaded;
    this._actionsQueue = new StoreActionQueue();

    if (this._isLazyLoaded || data.initialState instanceof Observable) {
      Object.defineProperty(this, '_lazyLoadProvider', {
        value: () => {
          this._provideStateData(data.initialState);
          delete this['_lazyLoadProvider'];
        },
        enumerable: true,
        configurable: true
      });
    } else {
      this._initializeState(data.initialState);
    }
  }


  public dispatch<K>(action: any, payload?: K): Observable<void> {
    this._initializeState();

    this.prevState = this.currentState;
    return this._dispatchAction(action, payload)
  }



  public filter(action: any, cb: (payload: any) => any): void {
    if (this._actions[action]) {
      this._actions[action] = [];
    }

    this._actions[action].push(cb);
  }


  private _dispatchAction(actionKey: any, payload: any): Observable<void> {
    if (!this._actions[actionKey]) {
      throw new Error(`Action not implemented ${actionKey.description}`)
    }

    let currentStateCopy = this._makeObjectDeepCopy(this.currentState);
    const context = {};
    return this._actionsQueue.enqueue([
      ...this._actions[actionKey].before.map(a => () => a(payload, currentStateCopy, context)),
      () => { this._setState(this._actions[actionKey].action(payload, currentStateCopy, context)); return true },
      () => { currentStateCopy = this._makeObjectDeepCopy(this.currentState); return true },
      ...this._actions[actionKey].after.map(a => () => a(payload, currentStateCopy, context)),
      () => this.changed.next(this.currentState)
    ]);
  }


  private _setState(data: T): void {
    const freezedData = this._freezeObjectRecursively(data);
    this._state.next(freezedData);
  }

  //
  // Initial state management
  //
  private _initializeState(initialData?: any): void {
    const freezedData = this._freezeObjectRecursively(initialData);
    if (!this._state) {
      this._state = new BehaviorSubject<T>(freezedData);
      this.changed.next(this.currentState);
    }
    if (this['_lazyLoadProvider']) this['_lazyLoadProvider']();
    
  }

  private _provideStateData(stateProvider: Function | Observable<any>): void {
    if (typeof stateProvider === 'function') {
      stateProvider = from(stateProvider());     
    };
    if (!(stateProvider instanceof Observable)) throw new Error();

    stateProvider.subscribe(result => {
      this._setState(result)
      this.changed.next(this.currentState);
    });
  }

  //
  // Utils
  //

  private _freezeObjectRecursively<T>(object: T): T {
    if (!(object instanceof Object) || object === null || object === undefined) return object;
    Object.keys(object).forEach(key => this._freezeObjectRecursively(object[key]));
    Object.freeze(object);
    return object;
  }

  private _makeObjectDeepCopy<T>(object: T): T {
    if (Array.isArray(object)) {
      return [...object].map(o => this._makeObjectDeepCopy(o)) as unknown as T
    } else if (typeof object === 'object' && object !== null) {
      const newObject = Object.assign({}, object);
      Object.keys(newObject).forEach(key => {
        newObject[key] = this._makeObjectDeepCopy(newObject[key]);
      }); 
      return newObject; 
    } else {
      return object;
    }
  }
}