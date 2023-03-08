import { Injectable } from "@angular/core";
import { GameMode } from "@hexchess-game-logic/lib/features/game/models/game-configuration";
import { forkJoin, map, Observable, of, shareReplay } from "rxjs";
import { ArmiesService, mapArmyToArmyBadge } from "src/app/core/armies/api";
import { IArmy } from "src/app/core/armies/models/army";
import { ITile } from "src/app/core/armies/models/tile";
import { BoardType } from "src/app/core/game-modes/api";
import { IArmyAssignment } from "src/app/core/matchmaking/api";
import { MyProfileStore } from "src/app/core/my-profile/api";
import { IProfileDto, ProfilesService } from "src/app/core/profiles/api";
import { IGameDataDto } from "../../models/game-data.dto";
import { IGameplayFeed } from "../../models/gameplay-feed";
import { IPlayer } from "../../models/player";

@Injectable()
export class GameplayInitializationService {
  gameplayFeed$: Observable<IGameplayFeed>; 

  constructor(
    private readonly _myProfileStore: MyProfileStore,
    private readonly _armiesService: ArmiesService,
    private readonly _profilesService: ProfilesService
  ) { }

  public initializeGameplayFeed(gameData: IGameDataDto): Observable<IGameplayFeed> {
    const myProfile = this._myProfileStore.currentState;

    return this.gameplayFeed$ = forkJoin({
      armies: this._armiesService.getArmies(gameData.matchmaking.armyAssignment.map(a => a.armyId)),
      profiles: this._profilesService.getProfiles(gameData.matchmaking.armyAssignment.map(a => a.profileId).filter(id => id !== myProfile.id)),
    })
      .pipe(
        map(feed => {
          const tiles = feed.armies.reduce((ts, a) => ts.concat([...a.tiles, a.headquarter]), []) as ITile[];
          return {
            armies: feed.armies,
            players: this._mapProfilesToPlayers(feed.profiles, gameData.matchmaking.armyAssignment, feed.armies),
            gameData: gameData,
            tiles: tiles,
            tileImages: tiles.map(t => ({ tileId: t.id, imageUrl: t.imageUrl })),
          }
        }),
        shareReplay(1)
    )
  }

  public requestForGameDetails(gameplayId: string): Observable<IGameDataDto> {
    return of({
      gameId: "bbb5365f-7658-4fc6-b991-c72c44998e3f",
      configuration: {
        board: {
          diameter: 5,
          type: BoardType.Hexagon
        },
        gameMode: GameMode.Skirmish,
        isOnline: false,
        playersNumber: 2,
        rules: {
          drawPerTurn: 3,
          startingLife: 20,
          tilesToKeepPerTurn: 2
        }
      },
      matchmaking: {
        id: "be4bf9d7-e305-45ef-aab9-aec886a12f02",
        armyAssignment: [
          { profileId: '218f5f8c-04e7-495d-b339-ba5f937a705d', armyId: "432d6de7-24cb-418c-8a6e-77841a36d59c" },
          { profileId: '218f5f8c-04e7-495d-b339-ba5f937a705d', armyId: "937ad7d2-deff-4203-9ec0-290b30e6eaa3" }
        ]
      }
    })
  } 

  private _mapProfilesToPlayers(profiles: IProfileDto[], armyAssignments: IArmyAssignment[], armies: IArmy[]): IPlayer[] {
    return armyAssignments.map(a => {
      const player = Object.assign({}, profiles.find(p => p.id === a.profileId)) as unknown as IPlayer;
      player.armyId = a.armyId;
      player.avatarUrl = player.avatarUrl;
      const army = armies.find(b => b.id === a.armyId);
      player.armyBadge = mapArmyToArmyBadge(army);
      return player;
    });
  }

}