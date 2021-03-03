import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameSummary } from '../../models/game-summary';
import { GamesSummaryStore } from '../../services/games-summary.store';



@Component({
  selector: 'my-games-widget',
  templateUrl: './my-games-widget.component.html',
  styleUrls: ['./my-games-widget.component.scss'],
  animations: [
    trigger('slideIns', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: '0', transform: 'translate(0, -30px)' }),
          stagger(`100ms`, [
            animate('200ms ease-in-out', style({ opacity: '1', transform: 'translate(0, 0)' }))
          ])
        ],  { optional: true })
      ])
    ])
  ]
})
export class MyGamesWidgetComponent implements OnInit {

  public gameSummaries: Observable<GameSummary[]>;

  @HostBinding('@slideIns') asd = true;

  @HostListener('@slideIns.done', ['$event'])
  animationsFinished(): void {
    this.ready.next();
  }

  @Output() ready: EventEmitter<void> = new EventEmitter();

  constructor(
    private readonly _gamesSummaryStore: GamesSummaryStore
  ) { }

  ngOnInit(): void {
    this.gameSummaries = this._gamesSummaryStore.state.pipe((map(games => games.slice(0, 3))));
  }

}
