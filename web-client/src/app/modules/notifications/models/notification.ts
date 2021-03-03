import { notificationApperance } from 'src/app/shared/components/notification/notification.component';

export enum NotificationType {
  Default,
  Error,
  Success,
  Warning
}

export class SystemNotification {
  public id: number;
  public type: NotificationType;
  public icon: string;
  public content: string;
  public apperance: string;

  constructor(data: Partial<SystemNotification>) {
    this.id = data.id;
    this.type = data.type;
    this.icon = data.icon;
    this.content = data.content;
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
