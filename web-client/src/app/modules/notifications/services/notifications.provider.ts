import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { NotificationsToken } from "../../authentication/constants/notifications";
import { AuthNotifications } from "../constants/notifications";


@Injectable({ providedIn: 'root'})
export class NotificationsProvider {

  constructor(
    private readonly _httpClient: HttpClient,
  ) {}

  getMyNotifications(): Observable<Notification[]> {
    //console.log('get data');
    return of([new Notification('asd')]);
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