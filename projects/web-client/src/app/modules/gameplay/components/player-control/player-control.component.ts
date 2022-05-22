import { Component, Input, OnInit } from '@angular/core';

import { ArmyBadge } from 'src/app/modules/game-modes/models/army';

@Component({
  selector: 'player-control',
  templateUrl: './player-control.component.html',
  styleUrls: ['./player-control.component.scss']
})
export class PlayerControlComponent implements OnInit {

  @Input() armyBadge: ArmyBadge;
  @Input() avatarUrl: string;
  @Input() message: string;


  constructor() { }

  ngOnInit(): void {
    console.log(this.avatarUrl);
  }
}
