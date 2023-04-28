import { Observable } from "rxjs";

export interface IStateStorage<S> {
  update: (key: string, s: S) => Observable<unknown>;
  read: (key: string) => Observable<S>;
  clear: (key: string) => void;
}