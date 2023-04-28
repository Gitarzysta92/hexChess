import { Injectable } from '@angular/core';
import { LocalStorageService, Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { INotification } from '../models/notification.interface';
import { NotificationsService } from '../services/notifications.service';
import { NotificationAction } from './actions/actions';

export const notificationsStoreKey = 'notifications-store';
export const notificationsStore = Symbol(notificationsStoreKey);

@Injectable()
export class NotificationsStore { 

  public get state() { return this._collection.state };

  private _collection: Store<INotification[]>;

  constructor(
    private readonly _store: StoreService,
    private readonly _provider: NotificationsService,
    private readonly _localStorageService: LocalStorageService
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
    this._collection.dispatch<INotification>(NotificationAction.markAllAsReaded);
  }
 
  private _registerStore() {
    this._collection = this._store.createStore<INotification[]>(notificationsStore, {
      initialState: this._provider.getMyNotifications(),
      isLazyLoaded: true,
      actions: {
        [NotificationAction.add]: {
          action: ctx => this._addNotification(ctx.payload, ctx.initialState),
          after: [ctx => this._localStorageService.update(notificationsStoreKey, ctx.computedState) ]
        },
        [NotificationAction.markAsReaded]: {
          action: ctx => this._markAsReaded(ctx.payload, ctx.initialState),
          after: [ctx => this._localStorageService.update(notificationsStoreKey, ctx.computedState) ]
        },
        [NotificationAction.markAllAsReaded]: {
          action: ctx => this._markAllAsReaded(ctx.initialState),
          after: [ctx => this._localStorageService.update(notificationsStoreKey, ctx.computedState) ]
        }
      }
    });
  }

  private _addNotification = (n: INotification, state: INotification[]): INotification[] => [n, ...state];

  private _markAsReaded = (nr: INotification, state: INotification[]): INotification[] => 
    state.map(n => n.id === nr.id ? Object.assign(n, { readed: true }) : n);
  
  private _markAllAsReaded = (state: INotification[]) => state.map(n => Object.assign(n, { readed: true }))
}