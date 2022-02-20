import { INotification, NotificationType } from "../../notifications";
export { NotificationType } from "../../notifications";

export class ArmiesNotification implements INotification {
  id: string;
  type: NotificationType;
  icon: string;
  title: string;
  content: string;
  readed: boolean;
  createdAt: Date;
  apperance: string;

  constructor(data: Partial<ArmiesNotification>) {
    this.id = data.id;
    this.type = data.type;
    this.icon = data.icon;
    this.title = data.title;
    this.content = data.content;
    this.readed = data.readed;
    this.createdAt = data.createdAt;
    this.apperance = data.apperance;
  }

}