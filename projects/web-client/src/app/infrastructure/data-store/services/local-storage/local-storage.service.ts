import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IStateStorage } from "../../models/store-state-storage";


@Injectable({ providedIn: 'root'})
export class LocalStorageService implements IStateStorage<unknown> {
  
  constructor() {}

  read<T extends object>(localStorageKey: string): Observable<T> {
    return of(JSON.parse(localStorage.getItem(localStorageKey)))
  }
  update<T extends object>(localStorageKey: string, profile: T): Observable<void> {
    return of(localStorage.setItem(localStorageKey, JSON.stringify(profile)))
  }

  clear(localStorageKey: string): void {
    localStorage.removeItem(localStorageKey);
  }

}