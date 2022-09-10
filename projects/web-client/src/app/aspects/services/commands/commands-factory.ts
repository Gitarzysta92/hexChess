import { Injectable, Injector, StaticProvider } from "@angular/core";
import { MakeTileAction } from "src/app/modules/gameplay/commands/high-order/make-tile-action.command";
import { SceneService } from "src/app/modules/gameplay/services/scene/scene.service";
import { BaseCommand, Command } from "./command-bus/base-command";
import { CommandBusService } from "./command-bus/command-bus.service";


@Injectable({ 
  providedIn: 'root'
})
export class CommandsFactory {
  private _injector: Injector;

  constructor(
    private readonly _parentInjector: Injector,
    private readonly _commandsBusService: CommandBusService
  ) { 
    this._injector = Injector.create({
      parent: this._parentInjector,
      providers: [
        this._createFactoryProvider(MakeTileAction, [SceneService, CommandBusService, CommandsFactory]),
      ]
    });
  }

  public create<T extends BaseCommand>(commandType: new(...args: any[]) => T): Command<T> {
    const command = this._injector.get(commandType)();
    return Object.assign(command, { dispatch: () => this._commandsBusService.dispatch.apply(command) });
  }

  private _createFactoryProvider(command: any, deps: any[]): StaticProvider {
    return {
      provide: command,
      useFactory: (...params) => {
        return () => Reflect.construct(command, params);
      },
      deps: deps || []
    }
  }
}
