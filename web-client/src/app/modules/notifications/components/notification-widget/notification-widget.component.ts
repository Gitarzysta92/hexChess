import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SystemNotification } from '../../models/notification';
import { NotificationsStore } from '../../services/notifications.store';

@Component({
  selector: 'notifications-widget',
  templateUrl: './notification-widget.component.html',
  styleUrls: ['./notification-widget.component.scss'],
})
export class NotificationWidgetComponent implements OnInit {


  public notifications: Observable<SystemNotification[]>;


  constructor(
    private readonly _notifications: NotificationsStore
  ) {}

  ngOnInit(): void {
    this.notifications = this._notifications.state.pipe(map(n => n.slice(0,3)));    
  }

}
