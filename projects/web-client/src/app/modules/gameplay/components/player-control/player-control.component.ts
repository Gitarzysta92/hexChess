import { Component, Input, OnInit } from '@angular/core';

import { ArmyBadge } from 'src/app/modules/game-modes/models/army';
// import { CommandsFactory } from '../../commands/commands-factory';
import { FinishRound } from '../../commands/state-transitions/round/finish-round.command';

@Component({
  selector: 'player-control',
  templateUrl: './player-control.component.html',
  styleUrls: ['./player-control.component.scss']
})
export class PlayerControlComponent implements OnInit {

  @Input() armyBadge: ArmyBadge;
  @Input() avatarUrl: string;
  @Input() message: string;


  constructor(
    // private readonly _stateProviderService: StateProviderService,
    // private readonly _command: CommandsFactory
  ) { }

  ngOnInit(): void { 

  }

  makeAction(): void {

    // if (a) {
    //   this._command.create(ConfirmTileAction).dispatch();
    // } else if(b) {
    //   this._command.create(FinishRound).dispatch();
    // }

  }

  undoLastCommand(): void {

  }
}
