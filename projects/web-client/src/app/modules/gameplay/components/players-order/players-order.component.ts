import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../../models/player';
import { GameplayFeed } from '../../services/gameplay/gameplay.service';

@Component({
  selector: 'players-order',
  templateUrl: './players-order.component.html',
  styleUrls: ['./players-order.component.scss']
})
export class PlayersOrderComponent implements OnInit, OnChanges {

  @Input() feed$: Observable<GameplayFeed> | undefined 

  currentPlayer: Player;
  nextPlayers: Player[];

  constructor() { }

  ngOnInit(): void {
    this.feed$.subscribe(feed => {
      const [ currentPlayer, ...nextPlayers ] = feed.players || [];

      this.currentPlayer = currentPlayer;
      this.nextPlayers = nextPlayers;
    });

  }

  ngOnChanges(): void {
    
  }

}
