import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { GameModeType } from "src/app/constants/game-mode-type.enum";
import { GameData } from "../models/game-data";
import { players } from "../models/player";

@Injectable()
export class GameDataResolver implements Resolve<GameData> {

  constructor() {
    
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GameData | Observable<GameData> | Promise<GameData> {
    return of(new GameData({
      id: route.params.id,
      type: GameModeType.Quickmatch,
      players: players,
    })).pipe(delay(2000));
  }

}