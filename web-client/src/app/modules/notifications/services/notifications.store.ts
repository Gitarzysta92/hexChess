import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection, StoreService } from 'src/app/core/services/store-service/store.service';
import { SystemNotification } from '../models/notification';
import { NotificationsProvider } from './notifications.provider';



const addNotification = Symbol('addNotification');
const markAsReaded = Symbol('markAsReaded');



@Injectable({ providedIn: 'root'})
export class NotificationsStore { 

  public get state() { return this._collection.state };

  private _collection: Collection<SystemNotification[]>;

  constructor(
    private readonly _store: StoreService,
    private readonly _provider: NotificationsProvider
  ) {
    this._registerStore();
  }

  public add(notification: SystemNotification): void {
    this._collection.dispatch<SystemNotification>(addNotification, notification);
  }

  public markAsReaded(notification: SystemNotification): void {
    this._collection.dispatch<SystemNotification>(markAsReaded, notification);
  }
 
  private _registerStore() {
    this._collection = this._store.register<SystemNotification[]>(Symbol('notifications'), () => {
      return {
        initialState: this._provider.getMyNotifications(),
        isLazyLoaded: true,
        actions: {
          [addNotification]: {
            before: [n => this._provider.addNotification(n)],
            action: this._addNotification,
          },
          [markAsReaded]: {
            before: [n => this._provider.updateNotification(n)],
            action: this._markAsReaded
          }
        } 
      }
    });
    
    // this._collection.before([addNotification], n => this._provider.addNotification(n));
    // this._collection.before([markAsReaded], n => this._provider.updateNotification(n));
  }

  private _addNotification = (n: SystemNotification, state: SystemNotification[]): SystemNotification[] => [n, ...state];

  private _markAsReaded = (nr: SystemNotification, state: SystemNotification[]): SystemNotification[] => state.map(n => 
    n.id === nr.id ? Object.assign(n, { readed: true }) : n);
}