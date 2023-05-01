import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GameSummary } from '../../models/game-summary';
import { GamesSummaryStore } from '../../stores/games-summary.store';


@Component({
  selector: 'my-games-widget',
  templateUrl: './my-games-widget.component.html',
  styleUrls: ['./my-games-widget.component.scss'],
})
export class MyGamesWidgetComponent implements OnInit {

  public gameSummaries: Observable<GameSummary[]>;

  constructor(
    private readonly _gamesSummaryStore: GamesSummaryStore,
  ) { }

  ngOnInit(): void {
    this.gameSummaries = this._gamesSummaryStore.state
      .pipe(map(games => games.slice(0, 3)));
  }
}
