import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { notifications } from "../constants/system-notifications";

import { NotificationType, SystemNotification } from "../models/notification";


const sampleNotifications = [
  notifications.warning,
  //notifications.error,
  //notifications.badCredentials,
  //notifications.success,
  //notifications.information
]







@Injectable({ providedIn: 'root'})
export class NotificationsProvider {

  constructor(
    private readonly _httpClient: HttpClient,
  ) {}

  getMyNotifications(): Observable<SystemNotification[]> {
    //console.log('get data');
    return of(sampleNotifications.map(n => new SystemNotification(n)));
  }
  updateNotification(n: Notification): Observable<boolean> {
    //console.log('update data')
    return of(true);
  }

  addNotification(n: Notification): Observable<boolean> {
    //console.log('add data')
    return of(true);
  }

}