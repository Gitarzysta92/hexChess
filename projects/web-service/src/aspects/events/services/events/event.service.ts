import { Injectable } from "@nestjs/common";
import { Observable, of, Subject } from "rxjs";
import { filter, mergeAll, tap } from "rxjs/operators";
import { Event } from "./event";

@Injectable()
export class EventService {

  private _mainStream: Subject<any> = new Subject();

  constructor() {}

  public on<T extends Event>(targetEvents: T[]): Observable<any> {
    const targetsList = Array.isArray(targetEvents) ? targetEvents : [targetEvents];

    return this._mainStream
      .pipe(mergeAll())
      .pipe(tap(value => {
        //console.log('event:', value);
      }))
      .pipe(filter(event => event instanceof Event))
      .pipe(filter(event => {
        return targetsList.some(te => event instanceof (te as any));
      }));
  } 

  public emit<T extends Event>(event: T) {
    this._mainStream.next(of(event));
  }

  // private _registerEventEmitter(emitter: EventEmitter<any>): void {
  //   this._mainStream.next(emitter);
  // }
}