import { ModuleWithProviders, NgModule } from "@angular/core";
import { MAIN_INITIALIZE } from "src/app/core";
import { SharedModule } from "src/app/shared/shared.module";
import { NotificationWidgetComponent } from "./components/notification-widget/notification-widget.component";
import { NotificationsCountWidgetComponent } from './components/notifications-count-widget/notifications-count-widget.component';
import { notifications, SystemNotificationsToken } from "./constants/system-notifications";
import { CommandsHandlerService } from "./services/commands-handler/commands-handler.service";
import { NotificationsStore } from "./stores/notifications.store";


@NgModule({
  declarations: [
    NotificationWidgetComponent,
    NotificationsCountWidgetComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    NotificationWidgetComponent,
    SharedModule,
    NotificationsCountWidgetComponent
  ],
})
export class NotificationsSharedModule {
  static forRoot(): ModuleWithProviders<NotificationsSharedModule> {
    return {
      ngModule: NotificationsSharedModule,
      providers: [
        NotificationsStore,
        { provide: SystemNotificationsToken, useValue: notifications },
        { provide: MAIN_INITIALIZE, useExisting: NotificationsStore, multi: true },
        { provide: MAIN_INITIALIZE, useClass: CommandsHandlerService, multi: true },
      ]
    };
  }
}



