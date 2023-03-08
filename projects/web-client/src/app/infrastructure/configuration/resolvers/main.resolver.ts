import { Inject, Injectable, Optional } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MAIN_INITIALIZE } from '../constants/main-initialization-token';

@Injectable({
  providedIn: 'root'
})
export class MainResolver implements Resolve<Observable<boolean>> {

  constructor(
    @Optional() @Inject(MAIN_INITIALIZE) _
  ) { }

  resolve(): Observable<boolean> {
    return of(true)
  }
}