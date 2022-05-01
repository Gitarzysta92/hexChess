import { Injectable, Injector } from "@angular/core";
import { BaseCommand, Command } from "../lib/command-bus/base-command";


@Injectable({ 
  providedIn: 'root'
})
export class CommandsFactory {

  constructor(
    private readonly _injector: Injector
  ) { }

  public create<T extends BaseCommand>(command: new(...args: any[]) => T): Command<T> {
    return this._injector.get(command);
  }
}
