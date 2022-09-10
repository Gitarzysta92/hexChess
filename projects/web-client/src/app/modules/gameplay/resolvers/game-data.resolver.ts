import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { RoutingService } from "src/app/core";
import { GameData } from "../models/game-data";
// import { GameplayService } from "../services/gameplay/gameplay.service";

@Injectable({ providedIn: 'root' })
export class GameDataResolver implements Resolve<GameData> {

  constructor(
   // private readonly _gameplayService: GameplayService,
    private readonly _routingService: RoutingService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GameData | Observable<GameData> | Promise<GameData> {
    return ({} as any).requestForSessionDetails(route.params.id)
      .pipe(catchError(err => {
        this._routingService.navigateToLobby();
        return throwError(err);
      }));
  }

}