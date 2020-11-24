import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

type actionsCfg2<T> = { [P in keyof T]?: Function[] }


type actionsCfg = { [k: string]: Function[] };


interface ActionEvent {
  
}



abstract class EventsHandler {
  protected _actions: actionsCfg;

  constructor(actions?: actionsCfg) {
    actions && this.addActions(actions);
  }

  protected addActions(actions): void {
    Object.keys(actions).forEach(key => {
      const isExists = this._actions.hasOwnProperty(key);
      if (isExists) {
        this._actions[key] = [...this._actions[key], ...actions[key]]
      } else {
        this._actions[key] = actions[key];
      }
    });
  } 
};

export class IncomingEventsHandler extends EventsHandler {

  private _destructor: Subject<void> = new Subject();

  private _sub: Subject<ActionEvent> = new Subject();

  constructor(actions?) {
    super(actions);
  }

  public addActions(actions: actionsCfg): void {
    super.addActions(actions);
    Object.keys(actions).forEach(key => {
      actions[key].forEach(action => {
        if (action instanceof Observable) {
          this._listenForAction(action);
        }
      })
    })
  }

  public subscribe(callback: Function) {
    this._sub.pipe(takeUntil(this._destructor))
      .subscribe(() => {
        callback();
      })
  }

  public destroy() {
    this._destructor.next()  
  }

  private _listenForAction(action: Observable<any>) {
    action.pipe(takeUntil(this._destructor))
      .subscribe(() => {
        this._sub.next();
      })
  }
}


export class OutgoingEventsHandler extends EventsHandler {
  constructor(actions) {
    super(actions);
  }
}





































// type actionsSetter = (setup: actionsCfg) => void;

// interface EventWrapperSetup<T> {
//   incoming: actionsCfg2<T>;
//   outgoing: actionsCfg2<T>;
// }

// interface ActionsSetters {
//   incoming: (setup: actionsCfg) => void;
//   outgoing: (setup: actionsCfg) => void;
// }

// type TargetMethods<T> = { [P in keyof T]: T[P] }


// export class EventWrapper<T> {

//   private _incoming: actionsCfg2<T>;
//   private _outgoing: actionsCfg2<T>;

//   constructor(target: T, setup?: EventWrapperSetup<T>): EventWrapper<T> & T {
//     this._incoming = {};
//     this._outgoing = {};

//     return this._decorate(target);
//   }

//   public addIncoming(actions: actionsCfg2<T>) {
//    this._register(this._incoming, actions); 
//   }

//   public addOutgoing(actions: actionsCfg) {
//     this._register(this._outgoing, actions);
//   }

//   public destroy() {
    
//   }

//   private _register(actions: actionsCfg, type: actionsCfg): void {
//     Object.keys(actions).forEach(key => {
//       const isExists = type.hasOwnProperty(key);
//       if (isExists) {
//         type[key] = [...type[key], ...actions[key]]
//       } else {
//         type[key] = actions[key];
//       }
//     });
//   }

//   private _decorate(object: T): EventWrapper<T> & keyof T {
//     const proxy = new Proxy(object, {
//       get: function(target, thisArg, argumentsList) {
//         if (typeof target === "function") {
//           return (...args) => {
//             target.call(args);
//             this._incoming[name].forEach(func => func());
//           }
//         } else {
//           return target;
//         }
//       }
//     });
//     return proxy;
//   }


//   private _listen(action: actionsCfg) {
//     action.
//   }
// }






// @SubscribeMessage('message')
// handleMessage(client: Socket, payload: any): string {
//   console.log('web socket');
//   console.log(this.socket === client);

//   this.socket = client;
//   return 'Hello world!';
// }

// @SubscribeMessage('create')
// handleCreate(client: Socket, payload: any) {

//   console.log('create');
//   client.join('room');
// }

// @SubscribeMessage('leave')
// handleLeave(client: Socket) {
//   console.log('leave');
//   client.leave('room');
// }

// emitMessage(roomName: string, payload: string): void {
//   console.log('emit', roomName);
//   this.server.to(roomName).emit('message', payload);
// }