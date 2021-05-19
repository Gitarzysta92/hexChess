import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { NotificationsToken } from "../../authentication/constants/notifications";
import { AuthNotifications } from "../constants/notifications";
import { NotificationType, SystemNotification } from "../models/notification";


@Injectable({ providedIn: 'root'})
export class NotificationsProvider {

  constructor(
    private readonly _httpClient: HttpClient,
  ) {}

  getMyNotifications(): Observable<SystemNotification[]> {
    //console.log('get data');
    return of([new SystemNotification({
      type: NotificationType.Success
    })]);
  }
  updateNotification(n: Notification): Observable<boolean> {
    //console.log('update data')
    throw of(true);
  }

  addNotification(n: Notification): Observable<boolean> {
    //console.log('add data')
    return of(true);
  }

}