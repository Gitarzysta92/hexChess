
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';


export const MAIN_INITIALIZE = new InjectionToken('mainInitialize');


@Injectable({
  providedIn: 'root'
})
export class MainResolver implements Resolve<Observable<string>> {

  constructor(
    @Optional() @Inject(MAIN_INITIALIZE) _
  ) { }

  resolve(): Observable<string> {
    return of('Route!')
  }
}