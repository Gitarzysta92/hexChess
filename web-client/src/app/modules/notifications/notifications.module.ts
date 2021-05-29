import { NgModule } from "@angular/core";
import { NotificationsRoutingModule, ROOT_PATH, routes } from "./notifications.routing";
import { NotificationsViewComponent } from './components/notifications-view/notifications-view.component';
import { NotificationWidgetComponent } from "./components/notification-widget/notification-widget.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AbstractModule } from "src/app/core/models/AbstractModule";
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationsCountWidgetComponent } from './components/notifications-count-widget/notifications-count-widget.component';




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
  ]
})
export class NotificationsSharedModule { }



@NgModule({
  declarations: [
    NotificationsViewComponent,
    NotificationComponent
  ],
  imports: [
    NotificationsRoutingModule,
    NotificationsSharedModule 
  ]
})
export class NotificationsModule extends AbstractModule { 
  static path = ROOT_PATH;
  static routes = routes;
}

