import { Injectable } from "@angular/core";
import { map, Observable, of, tap, throwError } from "rxjs";


@Injectable({ providedIn: 'root'})
export class LocalStorageService {
  
  constructor() {

  }

  get<T extends object>(localStorageKey: string): Observable<T> {
    return of(JSON.parse(localStorage.getItem(localStorageKey)))
      .pipe(map(v => !!v ? v : throwError(() => new Error())));
  }
  update<T extends object>(localStorageKey: string, profile: T): void {
    localStorage.setItem(localStorageKey, JSON.stringify(profile))
  }

}