import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';



interface CollectionConfig  {
  initialState: any,
  isLazyLoaded?: boolean,
  actions?: {
    [key: string]: {
      before: Function[],
      action: Function,
      after: Function[]
    },
  } 
}


@Injectable({ providedIn: 'root' })
export class StoreService {
  

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _store: Store
  ) { }

  register<T>(key: symbol, cb: (store) => CollectionConfig): Collection<T> {
    const config = cb(this._store);
    return this._store.createCollection(key, config);

  }
}





@Injectable({ providedIn: 'root' })
export class Store {
  private _collections: { [key: string]: Collection<any> }
  constructor() { 
    this._collections = {};
  }

  public createCollection<T>(key: any, config: CollectionConfig): Collection<T> {
    Object.defineProperty(this._collections, key, {
      value: new Collection<T>({key, ...config}),
      enumerable: true    
    });
    return this._collections[key];
  }

  dispatch<T>(collectionKey: any, notification: Notification) {
    
  }

  hook() {

  }



}





export class Collection<T> {
  private _key: Symbol;
  private _prevState: any;
  private _state: BehaviorSubject<T>;

  public get state() {
    this._initializeState();
    return this._state.pipe(filter(v => v !== null)); 
  }
  public get currentState() { return this._state.value }

  private _actionsQueue: ActionsQueue;
  private _actions: { [key: string]:  any }

  private _isLazyLoaded: boolean;

  constructor(data: CollectionConfig & { key: Symbol }) {
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


  public dispatch<K>(action: any, payload: K): void {
    this._initializeState();

    this._prevState = this.state;
    this._dispatchAction(action, payload)
  }

  public filter(action: any, cb: (payload: any) => any): void {
    if (this._actions[action]) {
      this._actions[action] = [];
    }

    this._actions[action].push(cb);
  }

  public before(action: any[], cb: (payload: any) => any): void {
   
  }


  private _dispatchAction(actionKey: any, payload: any): void {
    this._actionsQueue.dispatch([
      ...this._actions[actionKey].before.map(a => () => a(payload, this.currentState)),
      () => this._state.next(this._actions[actionKey].action(payload, this.currentState)),
      ...this._actions[actionKey].after.map(a => () => a(payload, this.currentState))
    ]);
  }





  //
  // Initial state management
  //
  private _initializeState(initialData?: any): void {
    if (!this._state) this._state = new BehaviorSubject<T>(initialData);
    if (this['_lazyLoadProvider']) this['_lazyLoadProvider']()
  }

  private _provideStateData(stateProvider: Function | Observable<any>): void {
    if (typeof stateProvider === 'function') {
      stateProvider = from(stateProvider);     
    };
    if (!(stateProvider instanceof Observable)) throw new Error();

    stateProvider.subscribe(result => this._state.next(result));
  }

}

class ActionsQueue {
  private _stack: Array<Function[] | Function>;

  constructor() {
    this._stack = [];

  }
  public dispatch(action): void {
    this._stack.push(action);
    this._proceed(this._stack.shift());
  }

  private _proceed(action: Function[] | Function): void {
    if (!action) return;
    if (!Array.isArray(action)) action = [action];
    action.forEach(a => a());
  }
}









// const gamesSummaries = Symbol('gamesSummaries');
// const addGameSummaryAction = Symbol('addGame');
// this._store.register(gamesSummaries, store => {
//   return {
//     initialState: store.games.slice(0, 3) || [],
//     actions: {
//       [addGameSummaryAction]: (state, gameSummary) => [gameSummary, ...state.slice(0,2)],
//     }
//   }
// })


// this._store.gamesSummaries.dispatch(addGameSummaryAction, action => new GameSummary());

// this._store.filter(addGameSummaryAction, payload => payload);

// this._store.hook(addGameSummaryAction)
//   .dispatch(addNotification, action => new Notification(action.prev.value))



// this._store.gamesSummaries.pipe(filter()).subscribe(state => this.state = state);
// this._store.notifications
//   .pipe(filter(value => value.slice(0,3)))
//   .subscribe(value => this.notifications)

// this._store.notifications.dispatch<MarkAsReaded>(MarkAsReaded, Object.assign(notification, { readed: true }))


// return this._myProfileService.getMyProfile();



// const app = {
//   myProfile: { },
//   system: {
//     menu: {
//       primary: {},
//       secondary: {},
//     },
//     routing: {},
    
//   },
//   chat: {
//     conversations: []
//   }

//   armies: { }
//   profiles: { }
//   gamesSummary: { }



//   matchmaking: {
    
//   }

// }
