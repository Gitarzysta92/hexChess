import { Injectable } from '@angular/core';
import { Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { INotification } from '../models/notification.interface';
import { NotificationsProvider } from '../services/notifications.provider';
import { NotificationAction } from './actions/actions';

export const notificationsStore = Symbol('notifications-store');

@Injectable()
export class NotificationsStore { 

  public get state() { return this._collection.state };

  private _collection: Store<INotification[]>;

  constructor(
    private readonly _store: StoreService,
    private readonly _provider: NotificationsProvider
  ) {
    this._registerStore();
  }

  public add(notification: INotification): void {
    this._collection.dispatch<INotification>(NotificationAction.add, notification);
  }

  public markAsReaded(notification: INotification): void {
    this._collection.dispatch<INotification>(NotificationAction.markAsReaded, notification);
  }

  public markAllAsReaded(): void {
    this._collection.dispatch<INotification>(NotificationAction.markAsReaded);
  }
 
  private _registerStore() {
    this._collection = this._store.createStore<INotification[]>(notificationsStore, {
      initialState: this._provider.getMyNotifications(),
      isLazyLoaded: true,
      actions: {
        [NotificationAction.add]: {
          before: [n => this._provider.addNotification(n)],
          action: this._addNotification,
        },
        [NotificationAction.markAsReaded]: {
          //before: [n => this._provider.updateNotification(n)],
          action: this._markAsReaded
        },
        [NotificationAction.markAsReaded]: {
          action: this._markAllAsReaded
        }
      }
    });
  }

  private _addNotification = (n: INotification, state: INotification[]): INotification[] => [n, ...state];

  private _markAsReaded = (nr: INotification, state: INotification[]): INotification[] => 
    state.map(n => n.id === nr.id ? Object.assign(n, { readed: true }) : n);
  
  private _markAllAsReaded = (_, state: INotification[]) => state.map(n => Object.assign(n, { readed: true }))
}