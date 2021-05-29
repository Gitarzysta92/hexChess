import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SystemNotification } from '../../models/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() data: SystemNotification;

  @Output() readed: EventEmitter<SystemNotification> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  public markAsReaded(): void {
    this.readed.next(this.data);
  }

}
