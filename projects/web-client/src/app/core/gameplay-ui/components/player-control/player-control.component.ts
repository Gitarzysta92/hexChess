import { Component, Input, OnInit } from '@angular/core';
import { ActivityName } from 'hexchess-game-logic/dist/lib/state/activity.interface';
import { CommandBusService } from 'src/app/aspects/commands/command-bus/command-bus.service';
import { CommandsStackService } from 'src/app/aspects/commands/commands-stack/commands-stack.service';
import { IArmyBadge } from 'src/app/core/armies/api';
import { IPlayer } from '../../../gameplay/models/player';
import { GameplayService } from '../../../gameplay/services/gameplay/gameplay.service';
import { IPlayerControlAction } from '../../models/player-control-action';

@Component({
  selector: 'player-control',
  templateUrl: './player-control.component.html',
  styleUrls: ['./player-control.component.scss']
})
export class PlayerControlComponent implements OnInit {

  @Input() action: IPlayerControlAction;
  @Input() currentPlayer: IPlayer;

  public get avatarUrl(): string { return this.currentPlayer.avatarUrl };
  public get armyBadge(): IArmyBadge { return this.currentPlayer.armyBadge };
  public get revertUnavailable(): boolean { return !this._commandsStack.isEmpty }

  constructor(
    private readonly _commandsStack: CommandsStackService
  ) { }

  ngOnInit(): void { }

  public makeAction(): void {
    this.action.callback();
  }

  public undoLastCommand(): void {
    this._commandsStack.revert();
  }

}
