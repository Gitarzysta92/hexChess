import { Injectable } from "@angular/core";
import { HexChess } from "hexchess-game-logic";
import { StateGenerator } from "hexchess-game-logic/dist/lib/state/state-generator";
import { Observable, ReplaySubject, Subject } from "rxjs";
import { ArmiesService } from "src/app/core/armies/services/armies.service";
import { TilesService } from "src/app/core/armies/services/tiles.service";
import { MyProfileStore } from "src/app/core/my-profile/stores/my-profile.store";
import { ConfigurationService } from "src/app/infrastructure/configuration/api";
import { IGameplayFeed } from "../../models/gameplay-feed";


@Injectable()
export class GameplayService {
  public gameplayFeed: IGameplayFeed;

  public events$: ReplaySubject<any> = new ReplaySubject();
  public gameplayFeed$: Observable<IGameplayFeed>;
  public playerTurnFinished$: Subject<void> = new Subject();

  private _hexChess: HexChess;
  private _stateGenerator: StateGenerator;

  constructor(
    private readonly _config: ConfigurationService,
    private readonly _myProfileStore: MyProfileStore,
    private readonly _armiesService: ArmiesService,
    private readonly _tileService: TilesService
  ) { }
  
  

  // public startTurn(): GameState {
  //   const allPlayersDrawHeadquarter = this.gameplayFeed.gameState.activityStack
  //     .filter(a => a.name === ActivityName.DrawHeadquarter).length === this.gameplayFeed.gameState.metadata.playersNumber
  //   if (allPlayersDrawHeadquarter) {
  //     return this._hexChess.startTurn();
  //   } else {
  //     return this._hexChess.startHeadquarterTurn();
  //   }
  // }

  // public discardTiles(tileIds: string[]): GameState {
  //   if (this.gameplayFeed.gameState.round === 1) {
  //     return
  //   };
  //   this._hexChess.discardTiles(tileIds);
  // }

  // public deployTile(tile: any, coords: any): GameState {
  //   if (!coords) {
  //     throw new Error('Coords must be provided for tile deploying')
  //   } 
  //   return this._hexChess.deployTile(tile, coords);
  // }

  // public revertLastActivity(): void {
  //   this._hexChess.rollbackActivity();
  // }

  // public finishTurn(): void {
  //   this._hexChess.finishTurn();
  //   this.playerTurnFinished$.next();
  // }

}