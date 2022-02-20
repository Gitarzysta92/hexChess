import { Inject, Injectable } from '@angular/core';
import { filter, tap } from 'rxjs/operators';
import { CommandBusService } from 'src/app/core/services/command-bus/command-bus.service';
import { SystemNotifications, SystemNotificationsToken } from '../../constants/system-notifications';
import { SystemNotification } from '../../models/notification';
import { add, NotificationsStore } from '../../stores/notifications.store';

export const notifyHttpConnectionError = 'notifyHttpConnectionError';

@Injectable({
  providedIn: 'root',
})
export class CommandsHandlerService {

  constructor(
    private readonly _commandsBus: CommandBusService,
    private readonly _notificationsStore: NotificationsStore,
    @Inject(SystemNotificationsToken) private readonly _notifications: SystemNotifications
  ) { 
    this._commandsBus.listen
      .pipe(filter(c => c.name === add))
      .subscribe(e => {
        this._notificationsStore.add(e.payload)
      });
    
    this._commandsBus.listen
      .pipe(filter(c => c.name === notifyHttpConnectionError))
      .subscribe(() => {
        this._notificationsStore.add(new SystemNotification(this._notifications.httpError))
      })
  }
}
