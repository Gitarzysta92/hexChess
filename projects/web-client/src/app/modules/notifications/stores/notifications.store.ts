import { Injectable } from '@angular/core';
import { Collection, StoreService } from 'src/app/core';
import { SystemNotification } from '../models/notification';
import { NotificationsProvider } from '../services/notifications.provider';


export const notificationsStore = Symbol('notifications');
export const add = Symbol('add');
export const markAsReaded = Symbol('markAsReaded');
export const markAllAsReaded = Symbol('markAllAsReaded');



@Injectable()
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
    this._collection.dispatch<SystemNotification>(add, notification);
  }

  public markAsReaded(notification: SystemNotification): void {
    this._collection.dispatch<SystemNotification>(markAsReaded, notification);
  }

  public markAllAsReaded(): void {
    this._collection.dispatch<SystemNotification>(markAllAsReaded);
  }
 
  private _registerStore() {
    this._collection = this._store.register<SystemNotification[]>(notificationsStore, () => {
      return {
        initialState: this._provider.getMyNotifications(),
        isLazyLoaded: true,
        actions: {
          [add]: {
            before: [n => this._provider.addNotification(n)],
            action: this._addNotification,
          },
          [markAsReaded]: {
            //before: [n => this._provider.updateNotification(n)],
            action: this._markAsReaded
          },
          [markAllAsReaded]: {
            action: this._markAllAsReaded
          }
        } 
      }
    });
    
    // this._collection.before([addNotification], n => this._provider.addNotification(n));
    // this._collection.before([markAsReaded], n => this._provider.updateNotification(n));
  }

  private _addNotification = (n: SystemNotification, state: SystemNotification[]): SystemNotification[] => [n, ...state];

  private _markAsReaded = (nr: SystemNotification, state: SystemNotification[]): SystemNotification[] => 
    state.map(n => n.id === nr.id ? Object.assign(n, { readed: true }) : n);
  
  private _markAllAsReaded = (_, state: SystemNotification[]) => state.map(n => Object.assign(n, { readed: true }))
}