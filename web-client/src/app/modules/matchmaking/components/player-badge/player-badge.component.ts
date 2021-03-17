import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { timer } from 'rxjs';
import { Army } from 'src/app/core/models/army';
import { armies } from 'src/app/core/services/utility-service/utility.service';



@Component({
  selector: 'player-badge',
  templateUrl: './player-badge.component.html',
  styleUrls: ['./player-badge.component.scss']
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