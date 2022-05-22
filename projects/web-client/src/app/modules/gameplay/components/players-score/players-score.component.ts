import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../models/player';

@Component({
  selector: 'players-score',
  templateUrl: './players-score.component.html',
  styleUrls: ['./players-score.component.scss']
})
export class PlayersScoreComponent implements OnInit {

  @Input() players: Player[]

  constructor() { }

  ngOnInit(): void { }

}
