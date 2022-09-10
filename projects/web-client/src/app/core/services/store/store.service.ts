import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, from, ObjectUnsubscribedError, Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, first, map, mergeMap, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ConfigurationService } from '../configuration/configuration.service';


interface CollectionConfig<T>  {
  initialState: any,
  isLazyLoaded?: boolean,
  actions?: {
    [key: string]: {
      before: Array<(p: any, state: T) => any>,
      action: Function,
      after: Array<(p: any, state: T) => any>
    },
  } 
}


@Injectable({ providedIn: 'root' })
export class StoreService {
  

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _store: Store
  ) { 
    this._store.state.subscribe(v => console.log(v));
  }

  public register<T>(key: symbol, cb: (store) => CollectionConfig<T>): Collection<T> {
    const config = cb(this._store);
    return this._store.createCollection(key, config);
  }

  public get<T>(key: symbol): Collection<T> {
    return this._store.getCollection<T>(key);
  }


}


@Injectable({ providedIn: 'root' })
export class Store {

  public state: Observable<Observable<any>[]>;
  private _state: BehaviorSubject<Observable<any>[]>;

  private _collections: { [key: string]: Collection<any> };

  constructor(
    private readonly _config: ConfigurationService
  ) { 
    this._collections = {};
    this._initializeGlobalStream();
  }

  public createCollection<T>(key: any, config: CollectionConfig<T>): Collection<T> {
    if (!!this._collections[key])
      if (this._config.isProduction) {
        return this._collections[key]
      } else {
        throw new Error(`Failed to create ${key.description} collection. Collection should be instantiated only once.`)
      } 


    Object.defineProperty(this._collections, key, {
      value: new Collection<T>({key, ...config}),
      enumerable: true    
    });

    this._updateCollectionsInGlobalStream(this._collections);
    return this._collections[key];
  }

  public getCollection<T>(key: any): Collection<T> {
    return this._collections[key];
  }

  private _initializeGlobalStream(): void {
    this._state = new BehaviorSubject([]);
    this.state = this._state
      .pipe(switchMap(c => combineLatest(c)))
      .pipe(filter(c => c.every(c => c.value)))
  }

  private _updateCollectionsInGlobalStream(collections: { [key: string]: Collection<any> }): void {
    this._state.next(Object.getOwnPropertySymbols(collections)
      .map(key => {
        return collections[key as any].changed.pipe(map(value => ({ key: (key as any).description, value })))
      }));
  }

} 





export class Collection<T> {
 
  public get state(): Observable<T> {
    this._initializeState();
    return this._state
      .pipe(filter(s => s != null));
  }
  public get currentState(): T { return this._state.value };
  public prevState: T;

  public changed: BehaviorSubject<any> = new BehaviorSubject(null);


  private _actionsQueue: ActionsQueue;
  private _actions: { [key: string]:  any }
  private _key: Symbol;
  
  private _state: BehaviorSubject<T>;

  private _isLazyLoaded: boolean;

  constructor(data: CollectionConfig<T> & { key: Symbol }) {
    this._key = data.key;
    this._actions = {};

    if (data.actions) {
      for(let key of Object.getOwnPropertySymbols(data.actions) ) {
        this._actions[key as any] = Object.assign({ before: [], after: [] }, data.actions[key as any]);
      }
    }
    

    this._isLazyLoaded = data.isLazyLoaded;

    this._actionsQueue = new ActionsQueue();

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

  public before(action: any[], cb: (payload: any) => any): void {
   
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

class ActionsQueue {
  private _stack: ActionWrapper[];

  constructor() {
    this._stack = [];

  }
  public enqueue(functionsSet: Function[] | Function): Observable<void> {
    const action = new ActionWrapper(functionsSet); 
    this._stack.push(action);
    if (this._stack.length === 1) {
      this._dequeue();
    }
    return action.finished
  }

  private async _dequeue(): Promise<void> {
    if (this._stack.length === 0) return;
    const action = this._stack.shift();
    await action.execute();
    await this._dequeue();
  }
}


class ActionWrapper {

  public get finished() {
    return this._finished.pipe(first());
  }

  private _fns: Function[];
  private _finished: Subject<void>;

  constructor(fns: Function | Function[]) {
    this._fns = Array.isArray(fns) ? fns : [fns];
    this._finished = new Subject();
  }

  public async execute(): Promise<void> {
    if (this._fns.length === 0) {
      return this._finished.next();
    };
    const fn = this._fns.shift();    
    let result = fn();

    try {
      if (result instanceof Promise) {
        await result;
      } else if (result instanceof Observable) {
        await result.toPromise()
      }
    } catch (error) {
      return this._finished.error(error);
    }

    this.execute();
  }
}