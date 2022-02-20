export { NotificationsSharedModule } from './notifications.shared-module';
export { INotification, NotificationType } from './models/notification';

import { add as _add, markAsReaded as _markAsReaded, markAllAsReaded as _markAllAsReaded, notificationsStore as _notificationsStore } from './stores/notifications.store';
import { notifyHttpConnectionError as _notifyHttpConnectionError } from './services/commands-handler/commands-handler.service';
import { ROOT_PATH as _ROOT_PATH, routes as _routes } from './notifications.routing';


export const notificationsStore = _notificationsStore;
export namespace NotificationsActions {

  export const add = _add;
  export const markAsReaded = _markAsReaded;
  export const markAllAsReaded = _markAllAsReaded

  export const notifyHttpConnectionError = _notifyHttpConnectionError;
}


export namespace Notifications {

  export const ROOT_PATH = _ROOT_PATH;
  export const routes = _routes;

  export namespace Actions {
    export const add = _add;
    export const markAsReaded = _markAsReaded;
    export const markAllAsReaded = _markAllAsReaded
  }
  export namespace Commands {
    export const notifyHttpConnectionError = _notifyHttpConnectionError;
  }
}



