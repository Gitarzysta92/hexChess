import { Injectable } from "@angular/core";
import { BaseCommand } from "src/app/aspects/services/commands/command-bus/base-command";




@Injectable()
export class FinishGame extends BaseCommand {
    
  constructor() {
    super();

  } 

  execute(): void {

  }

}