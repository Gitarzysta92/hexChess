import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Player } from '../../models/player';

@Component({
  selector: 'players-order',
  templateUrl: './players-order.component.html',
  styleUrls: ['./players-order.component.scss']
})
export class PlayersOrderComponent implements OnInit, OnChanges {

  @Input() players: Player[]

  currentPlayer: Player;
  nextPlayers: Player[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    const [ currentPlayer, ...nextPlayers ] = this.players || [];

    this.currentPlayer = currentPlayer;
    this.nextPlayers = nextPlayers;
  }

}
