import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { slideInFromTopMultipleElements } from 'src/app/shared/animations/predefined-animations';
import { INotification } from '../../models/notification.interface';
import { NotificationsStore } from '../../stores/notifications.store';


@Component({
  selector: 'app-notifications-view',
  templateUrl: './notifications-view.component.html',
  styleUrls: ['./notifications-view.component.scss'],
  animations: [
    slideInFromTopMultipleElements('slideIn')
  ]
})
export class NotificationsViewComponent implements OnInit {

  public notifications: Observable<INotification[]>;

  constructor(
    private readonly _notificationsStore: NotificationsStore
  ) { 
    this.notifications = this._notificationsStore.state    
  }

  ngOnInit(): void {}

  public markAsReaded(notify: INotification): void {
    this._notificationsStore.markAsReaded(notify);
  }

  public markAllAsReaded(): void {
    this._notificationsStore.markAllAsReaded();
  }

  public trackByFn(index, item) {
    return item.id
  }

}
