import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject, throwError } from 'rxjs';
import { catchError, mapTo, switchMap, takeUntil, tap } from 'rxjs/operators';
import { RoutingService } from 'src/app/core';
import { SelectedArmiesStore } from 'src/app/modules/game-modes/stores/selected-armies.store';
import { MatchmakingService } from '../../services/matchmaking/matchmaking.service';

@Component({
  selector: 'app-loading-view',
  templateUrl: './loading-view.component.html',
  styleUrls: ['./loading-view.component.scss']
})
export class MatchmakingLoadingViewComponent implements OnInit, OnDestroy {

  private _destroy: Subject<void> = new Subject();

  constructor(
    private readonly _matchmakingService: MatchmakingService,
    private readonly _routingService: RoutingService,
    private readonly _route: ActivatedRoute,
    private readonly _selectedArmiesStore: SelectedArmiesStore,
  ) { }

  ngOnInit(): void {
    combineLatest({
      params: this._route.queryParams,
      selectedArmies: this._selectedArmiesStore.state
    })
      .pipe(
        switchMap(result => this._matchmakingService.requestForQuickMatch(parseInt(result.params.players), result.selectedArmies.map(a => a.armyId))),
        catchError(err => {
          this._routingService.navigateToLobby();
          return throwError(err);
        }),
        takeUntil(this._destroy)
      )
      .subscribe(token => {
        this._routingService.navigate(['matchmaking/quickmatch', token]);
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
  }
}