import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NotificationsStore } from '../../services/notifications.store';

@Component({
  selector: 'notifications-widget',
  templateUrl: './notification-widget.component.html',
  styleUrls: ['./notification-widget.component.scss'],
})
export class NotificationWidgetComponent implements OnInit {


  public notifications: Observable<Notification[]>;


  constructor(
    private readonly _notifications: NotificationsStore
  ) {}

  ngOnInit(): void {
    this.notifications = this._notifications.state.pipe(map(n => n.slice(0,3)));    
  }

}
