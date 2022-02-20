import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { NotificationComponent } from './components/notification/notification.component';
import { NotificationsViewComponent } from './components/notifications-view/notifications-view.component';
import { routes } from "./notifications.routing";
import { NotificationsSharedModule } from "./notifications.shared-module";





@NgModule({
  imports: [RouterModule.forChild(routes.bindComponents({
    me: NotificationsViewComponent
  }).toDefaultFormat())],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }


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
export class NotificationsModule { }

