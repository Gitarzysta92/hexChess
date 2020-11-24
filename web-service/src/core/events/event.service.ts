import { Injectable } from "@nestjs/common";
import { Observable, of, Subject } from "rxjs";
import { filter, mergeAll, takeUntil, tap } from "rxjs/operators";
import { EventEmitter } from "./event-emitter";
import { SystemEvent } from "./system-event";

@Injectable()
export class EventService {

  private _mainStream: Subject<any> = new Subject();

  constructor() {
    EventEmitter.onInstanceCreated(e => this._registerEventEmitter(e));
  }

  public on<T extends SystemEvent>(targetEvents: T[]): Observable<any> {
    const targetsList = Array.isArray(targetEvents) ? targetEvents : [targetEvents];

    return this._mainStream
      .pipe(mergeAll<T>())
      .pipe(tap(value => {

        console.log('event:', value);
      }))
      .pipe(filter(event => event instanceof SystemEvent))
      .pipe(filter(event => {
        return targetsList.some(te => event instanceof (te as any));
      }));
  } 

  public emit<T extends SystemEvent>(event: T) {
    this._mainStream.next(of(event));
  }

  private _registerEventEmitter(emitter: EventEmitter<any>): void {
    this._mainStream.next(emitter);
  }
}





// public createEventHandler(): EventHander {
//   const eventHandler = new EventHander();
//   return eventHandler;
// }

// public setEventHandler<T extends object>(target: T) {
//   target = this._listenForIncomingActions(target);
//   target = this._listenForOutgoingActions(target);
//   return target;
// }



// private _listenForIncomingActions(target) {
//   const eventHander = new IncomingEventsHandler();

//   eventHander.subscribe(ActionEvent => {
//     const { propName, args } = ActionEvent;
//     target[propName](...args)
//   })

//   return Object.assign(target, { addIncoming: eventHander.addActions })
// }

// private _listenForOutgoingActions(target) {
//   const eventHander = new EventHander();
//   const callback = (target, ...args) => (target.call(args), eventHander.)

//   const proxed = new Proxy(target, {
//     get: function(target, prop, receiver) {
//       if (typeof target === "function") {
//         return (...args) => {
//           target.call(args);
//           eventHander.emit(target);
//         }
//       } else {
//         return target;
//       }
//     }
//   });

//   return Object.assign(proxed, { addOutgoing: eventHander.addActions })
// }