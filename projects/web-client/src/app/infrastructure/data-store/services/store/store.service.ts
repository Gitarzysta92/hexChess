import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ConfigurationService } from '../../../configuration/services/configuration.service';
import { IStoreConfig } from '../../models/store-config';
import { Store } from './store';


@Injectable({ providedIn: 'root' })
export class StoreService {

  public state: Observable<Observable<any>[]>;
  private _state: BehaviorSubject<Observable<any>[]>;

  private _collections: { [key: string]: Store<any> };

  constructor(
    private readonly _config: ConfigurationService
  ) { 
    this._collections = {};
    this._initializeGlobalStream();
  }

  public createStore<T>(key: any, config: IStoreConfig<T>): Store<T> {
    if (!!this._collections[key])
      if (this._config.isProduction) {
        return this._collections[key]
      } else {
        throw new Error(`Failed to create ${key.description} collection. Collection should be instantiated only once.`)
      } 

    Object.defineProperty(this._collections, key, {
      value: new Store<T>({key, ...config}),
      enumerable: true    
    });

    this._updateCollectionsInGlobalStream(this._collections);
    return this._collections[key];
  }


  public getStore<T>(key: any): Store<T> {
    return this._collections[key];
  }

  public clearStates() {
    for (let key of Object.getOwnPropertySymbols(this._collections)) {
      this._collections[key as any].clearState();
     }
  }

  private _initializeGlobalStream(): void {
    this._state = new BehaviorSubject([]);
    this.state = this._state
      .pipe(
        switchMap(c => combineLatest(c)),
        filter(c => c.every(c => c.value))
      )

  }

  private _updateCollectionsInGlobalStream(collections: { [key: string]: Store<any> }): void {
    this._state.next(Object.getOwnPropertySymbols(collections)
      .map(key => {
        return collections[key as any].changed.pipe(map(value => ({ key: (key as any).description, value })))
      }));
  }
}