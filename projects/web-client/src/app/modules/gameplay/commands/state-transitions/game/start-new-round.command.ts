import { Injectable } from "@angular/core";
import { BaseCommand } from "src/app/aspects/services/commands/command-bus/base-command";



@Injectable()
export class StartNewRound extends BaseCommand{
  execute(): void {

  }

}