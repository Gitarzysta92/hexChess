import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameSummary } from '../../models/game-summary';
import { GamesService } from '../../services/games-service/games.service';
import { GamesSummaryStore } from '../../services/games-summary.store';



@Component({
  selector: 'my-games-widget',
  templateUrl: './my-games-widget.component.html',
  styleUrls: ['./my-games-widget.component.scss'],
})
export class MyGamesWidgetComponent implements OnInit {

  public gameSummaries: Observable<GameSummary[]>;

  constructor(
    private readonly _gamesSummaryStore: GamesSummaryStore,
    private readonly _gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.gameSummaries = this._gamesSummaryStore.state.pipe((map(games => games.slice(0, 3))));
  }

}
