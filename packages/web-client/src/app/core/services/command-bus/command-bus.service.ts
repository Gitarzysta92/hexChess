import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandBusService {
  private _bus: Subject<Command> = new Subject();
  public get listen(): Subject<Command> { return this._bus; }

  constructor() { }

  dispatch(name: any, payload?: any): any {
    this._bus.next(new Command({ name, payload }))
  }
}


export class Command {
  public name: any;
  public payload: any;
  constructor(data: Command) {
    this.name = data.name;
    this.payload = data.payload;
  }
}