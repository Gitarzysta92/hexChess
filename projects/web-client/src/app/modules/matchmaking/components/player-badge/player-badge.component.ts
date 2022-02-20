import { Component, Input, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/shared/animations/predefined-animations';
import { ArmyBadgeConfig } from 'src/app/shared/components/army-badge/army-badge.component';
import { HexagonColors } from 'src/app/shared/components/hexagon/hexagon.component';



@Component({
  selector: 'player-badge',
  templateUrl: './player-badge.component.html',
  styleUrls: ['./player-badge.component.scss'],
  animations: [
    fadeIn('fadeIn')
  ]
})
export class PlayerBadgeComponent implements OnInit {

  @Input() player: MatchedPlayer
  
  @Input() avatar: 'top' |  'right' | 'left' ;

  constructor() { }

  ngOnInit(): void { } 

}



export class MatchedPlayer {
  public avatar: string;
  public name: string;
  public army: Army;

  constructor(data: Partial<MatchedPlayer>) {
    this.avatar = data.avatar;
    this.army = data.army;
    this.name = data.name;
  }
}

export class Army implements ArmyBadgeConfig {
  icon: string;
  colors?: HexagonColors;
  constructor(data: Partial<Army>) {
    Object.assign(this, data);
  }

}