import { Component, Input, OnInit } from '@angular/core';
import { Army } from 'src/app/core/models/army';
import { fadeIn } from 'src/app/shared/animations/predefined-animations';



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