import { Component, Input, OnInit } from '@angular/core';
import { IPlayer } from 'src/app/core/gameplay/api';


@Component({
  selector: 'players-score',
  templateUrl: './players-score.component.html',
  styleUrls: ['./players-score.component.scss']
})
export class PlayersScoreComponent implements OnInit {

  @Input() players: IPlayer[]

  constructor() { }

  ngOnInit(): void {}

}
