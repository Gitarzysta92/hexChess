import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NotificationsStore } from '../../services/notifications.store';

@Component({
  selector: 'notifications-widget',
  templateUrl: './notification-widget.component.html',
  styleUrls: ['./notification-widget.component.scss'],
  animations: [
    trigger('slideIns', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: '0', transform: 'translate(0, -30px)' }),
          stagger(`100ms`, [
            animate('200ms ease-in-out', style({ opacity: '1', transform: 'translate(0, 0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class NotificationWidgetComponent implements OnInit {

  @HostBinding('@slideIns') asd = true;
  public notifications: Observable<Notification[]>;


  constructor(
    private readonly _notifications: NotificationsStore
  ) {}

  ngOnInit(): void {
    this.notifications = this._notifications.state.pipe(map(n => n.slice(0,3)));    
  }

}
