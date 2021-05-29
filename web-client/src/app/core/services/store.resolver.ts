
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NotificationsStore } from 'src/app/modules/notifications/services/notifications.store';

@Injectable({
  providedIn: 'root'
})
export class StoreResolver implements Resolve<Observable<string>> {

  constructor(
    private readonly _notificationsStore: NotificationsStore
  ) {}

  resolve(): Observable<string> {
    console.log('resolver')
    return of('Route!')
  }
}