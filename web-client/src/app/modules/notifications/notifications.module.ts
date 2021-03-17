import { NgModule } from "@angular/core";
import { ROOT_PATH, routes } from "./notifications.routing";
import { NotificationsViewComponent } from './components/notifications-view/notifications-view.component';
import { NotificationWidgetComponent } from "./components/notification-widget/notification-widget.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AbstractModule } from "src/app/core/models/AbstractModule";




@NgModule({
  declarations: [
    NotificationWidgetComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    NotificationWidgetComponent
  ]
})
export class NotificationsSharedModule { }



@NgModule({
  declarations: [
    NotificationsViewComponent
  ],
  imports: [
    NotificationsSharedModule 
  ]
})
export class NotificationsModule extends AbstractModule { 
  static path = ROOT_PATH;
  static routes = routes;
}

