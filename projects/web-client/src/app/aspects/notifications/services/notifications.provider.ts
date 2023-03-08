import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { COMMON_NOTIFICATIONS } from "../constants/common-notifications";
import { Notification } from "../models/notification";

const sampleNotifications = [
  COMMON_NOTIFICATIONS.warning,
  //notifications.error,
  //notifications.badCredentials,
  //notifications.success,
  //notifications.information
];

@Injectable({ providedIn: 'root'})
export class NotificationsProvider {

  constructor(
    private readonly _httpClient: HttpClient,
  ) {}

  getMyNotifications(): Observable<Notification[]> {
    //console.log('get data');
    return of(sampleNotifications.map(n => new Notification(n)));
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