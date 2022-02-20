import { notificationApperance } from 'src/app/shared/components/notification/notification.component';
import { v4 as uuid } from 'uuid';

export enum NotificationType {
  Default,
  Error,
  Success,
  Warning
}

type TextWithHtml = string;

export interface INotification {
  id: string;
  type: NotificationType;
  icon: string;
  title: string;
  content: TextWithHtml;
  readed: boolean;
  createdAt: Date;
  apperance: string;
}


export class SystemNotification implements INotification {
  public id: string;
  public type: NotificationType;
  public icon: string;
  public title: string;
  public content: TextWithHtml;
  public readed: boolean;
  public createdAt: Date;
  public apperance: string;
  

  constructor(data: Partial<SystemNotification>) {
    this.id = uuid()
    this.type = data.type;
    this.icon = data.icon;
    this.title = data.title;
    this.content = data.content;
    this.readed = data.readed;
    this.apperance = this._setApperance(this.type);
  }


  private _setApperance(type: NotificationType): string {
    let apperance = notificationApperance.default;
    switch(type) {
      case NotificationType.Error:
        apperance = notificationApperance.error;
        break;
      case NotificationType.Warning:
        apperance = notificationApperance.warning;
        break;
      case NotificationType.Success:
        apperance = notificationApperance.success;
        break;
    }
    return apperance;
  }
}
