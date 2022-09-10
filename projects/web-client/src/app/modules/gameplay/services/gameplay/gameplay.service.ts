import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HexChess } from "hexchess-game-logic";
import { EventService } from "hexchess-game-logic/dist/lib/events/event-service";
import { ArmyHelper } from "hexchess-game-logic/dist/lib/features/army/army-helper";
import { CoordsHelper } from "hexchess-game-logic/dist/lib/features/board/coords-helper";
import { Coord } from "hexchess-game-logic/dist/lib/features/board/interfaces/coords";
import { GameHelper } from "hexchess-game-logic/dist/lib/features/game/game-helper";
import { GameMode, PlayerDeclaration } from "hexchess-game-logic/dist/lib/features/game/models/game-configuration";
import { GameDispatcher } from "hexchess-game-logic/dist/lib/state/game-dispatcher";
import { GameState } from "hexchess-game-logic/dist/lib/state/game-state";
import { StateGenerator } from "hexchess-game-logic/dist/lib/state/state-generator";
import { Observable, delay, of, switchMap, merge, map, forkJoin, first, shareReplay, tap } from "rxjs";
import { ConfigurationService, RoutingService } from "src/app/core";
import { ArmyBadge } from "src/app/modules/game-modes/models/army";
import { ArmiesService } from "src/app/modules/game-modes/services/armies/armies.service";
import { RoomPlayersUpdateEvent, MatchmakingCompletedEvent, MatchmakingRejectedEvent } from "src/app/modules/matchmaking/models/events";
import { MyProfile, Profile } from "src/app/modules/my-profile/models/profile";
import { MyProfileStore } from "src/app/modules/my-profile/stores/my-profile.store";
import { WrappedSocket } from "src/app/utils/ng-web-sockets/ng-web-sockets.service";
import { GameData } from "../../models/game-data";
import { Player } from "../../models/player";

export type Bitmap = number[][];
export type Coords2Mapping = { x: number, y: number, key: string; };



export interface GameplayFeed {
  badges: ArmyBadge[];
  players: Player[];
  me: Player,
  gameData: GameData,
  gameState: GameState,
  coordsMapping: any[]
}

@Injectable()
export class GameplayService {

  gameFeed: Observable<GameplayFeed>;

  //turnFinished$: Observable<>;

  private _hexChess: HexChess;
  private _stateGenerator: StateGenerator;

  constructor(
    private readonly _socket: WrappedSocket,
    private readonly _httpClient: HttpClient,
    private readonly _config: ConfigurationService,
    private readonly _routingService: RoutingService,
    private readonly _myProfileStore: MyProfileStore,
    private readonly _armiesService: ArmiesService,
  ) { 
    this._stateGenerator = new StateGenerator(ArmyHelper, CoordsHelper, GameHelper);
    this._hexChess = new HexChess(
      new GameDispatcher(this._stateGenerator),
      new EventService()
    )
  }

  initialize(gameData: GameData): Observable<GameplayFeed> {

    this.gameFeed = forkJoin({
      badges: this._armiesService.getArmiesBadges(),
      profiles: of(gameData.profiles),
      myProfile: this._myProfileStore.state.pipe(first()),
      gameData: of(gameData)
    })
      .pipe(
        map(feed => Object.assign(feed, { myProfile: this._mapMyProfile(feed) })),
        map(feed => Object.assign(feed, { profiles: this._mapProfiles(feed) })),
        map(feed => {
          const cfg = {
            mode: GameMode.Skirmish,
            playersNumber: feed.profiles.length,
            players: feed.profiles as unknown as PlayerDeclaration[],
            startingLife: 20,
            boardSize: 5,
            drawPerTurn: 3
          }
          const state = this._stateGenerator.createInitialState(cfg);
          this._hexChess.initialize(state, feed.myProfile as any);
          const hexChess = this._hexChess;

          return {
            badges: feed.badges,
            players: feed.profiles,
            me: feed.myProfile,
            gameData: feed.gameData,
            coordsMapping: this._generateCoords2Mapping(CoordsHelper.sortCoordsByRows(state.board.coords)),
            get gameState() { return hexChess.getCurrentState() }
          }
        }),
        tap(console.log),
        shareReplay(1)
    )
    return this.gameFeed;
  }

  startGame() {
    this._hexChess.startHeadquarterTurn();
  }
  
  requestForSessionDetails(id: string): Observable<GameData> {
    return this._httpClient.get<GameData>(`${this._config.apiUrl}/game/session/${id}`).pipe(delay(2000))
  }

  joinSession(token: string): Observable<RoomPlayersUpdateEvent | MatchmakingCompletedEvent | MatchmakingRejectedEvent> {
    return of(this._socket.connect({ query: { token } }))
      .pipe(
        switchMap(() => merge(
          this._socket.fromEvent("players-updated").pipe(map(p => new RoomPlayersUpdateEvent(p))),
          this._socket.fromEvent("matchmaking-completed").pipe(map(p => new MatchmakingCompletedEvent(p))),
          this._socket.fromEvent("matchmaking-rejected").pipe(map(() => new MatchmakingRejectedEvent())),
          this._socket.fromEvent('disconnect').pipe(map(() => new MatchmakingRejectedEvent())),
        ))
      ) 
  }

  confirmReadiness(): void {
    this._socket.emit('confirm-readiness')
  }

  leaveRoom() {
    this._socket.disconnect();
  }

  exitGame(): void {
    this._routingService.navigateToLobby();
  }


  private _mapMyProfile(feed: { gameData: GameData, myProfile: MyProfile, badges: ArmyBadge[] }): MyProfile {
    const armyId = feed.gameData.armyAssignments.find(d => d.profileId === feed.myProfile.id)?.armyId;
    const armyBadge = feed.badges.find(b => b.id === armyId);
    return Object.assign({ ...feed.myProfile}, {
      avatarUrl: `${this._config.avatarsBlobStorageUrl}/${feed.myProfile.avatar}`,
      armyBadge: armyBadge,
      armyId: armyId
    });
  }

  private _mapProfiles(feed: { gameData: GameData, profiles: Profile[], badges: ArmyBadge[] }): Player[] {
    return feed.gameData.armyAssignments.map(a => {
      const player = Object.assign({}, feed.profiles.find(p => p.id === a.profileId)) as unknown as Player;
      player.armyId = a.armyId;
      player.avatarUrl = "";
      player.armyBadge = feed.badges.find(b => b.id === a.armyId);
      return player;
    });
  }

  private _generateCoords2Mapping(coordRows: Coord[][]): Coords2Mapping[] {
    const matrix: Coords2Mapping[] = [];

    const bitmap = [
      [0,0,1,0,1,0,1,0,0],
      [0,1,0,1,0,1,0,1,0],
      [1,0,1,0,1,0,1,0,1],
      [0,1,0,1,0,1,0,1,0],
      [0,0,1,0,1,0,1,0,0],    
    ]

    bitmap.forEach((row, y) => {
      let i = 0;
      row.forEach((bit, x) => {
        if (!bit) {
          return;
        }
        const coord = coordRows[y][i];
        if (coord) {
          matrix.push({ x, y, key: `${coord.q}${coord.r}${coord.s}` });
          i++;
        }
      })
    });
    return matrix;
  };

}
