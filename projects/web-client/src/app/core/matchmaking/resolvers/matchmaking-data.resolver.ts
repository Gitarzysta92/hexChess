import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router";
import { catchError, combineLatest, Observable, switchMap, takeUntil, throwError } from "rxjs";
import { RoutingService } from "src/app/aspects/navigation/api";
import { SelectedArmiesStore } from "../../armies/stores/selected-armies.store";
import { MatchmakingService } from "../services/matchmaking/matchmaking.service";


@Injectable({ providedIn: 'root' })
export class MatchmakingDataResolver implements Resolve<any> {

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _selectedArmiesStore: SelectedArmiesStore,
    private readonly _matchmakingService: MatchmakingService,
    private readonly _routingService: RoutingService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
    return combineLatest({
        params: this._route.queryParams,
        selectedArmies: this._selectedArmiesStore.state
      })
      .pipe(
        switchMap(result => this._matchmakingService
          .requestForQuickMatch(parseInt(result.params.players), result.selectedArmies.map(a => a.armyId))),
        catchError(err => {
          this._routingService.navigateToLobby();
          return throwError(err);
        }),
      )
  }

}