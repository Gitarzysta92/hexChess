import { Observable } from "rxjs";

export type Command<T extends BaseCommand> = Pick<T, 'setParameters' | 'dispatch'>;


export abstract class BaseCommand {
  abstract execute(): void;
  public isConsumed!: boolean;
}

export interface BaseCommand {
  dispatch(): Command<this>;
  setParameters(...args: any[]): Command<this>;
}

export abstract class AsyncBaseCommand extends BaseCommand {
  abstract finished: Observable<void>;
}
