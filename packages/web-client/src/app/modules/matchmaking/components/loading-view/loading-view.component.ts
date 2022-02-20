import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mapTo, switchMap, tap } from 'rxjs/operators';
import { RoutingService } from 'src/app/core';
import { GameSessionService } from '../../services/game-session/game-session.service';

@Component({
  selector: 'app-loading-view',
  templateUrl: './loading-view.component.html',
  styleUrls: ['./loading-view.component.scss']
})
export class LoadingViewComponent implements OnInit {

  constructor(
    private readonly _gameSessionService: GameSessionService,
    private readonly _routingService: RoutingService,
    private readonly _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.queryParams
      .pipe(switchMap(params => this._gameSessionService.requestForQuickMatch(parseInt(params.players))))
      .subscribe(token => {
        this._routingService.navigate(['matchmaking/quickmatch', token]);
      });
  }
}