import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { BaseCommand } from "src/app/aspects/services/commands/command-bus/base-command";
import { CommandBusService, DefaultCommandsHandler } from "src/app/aspects/services/commands/command-bus/command-bus.service";
import { CommandsFactory } from "src/app/aspects/services/commands/commands-factory";
import { CommandsStackService, RevertableCommand } from "src/app/aspects/services/commands/commands-stack/commands-stack.service";
import { ConfigurationService } from "src/app/core";
import { ArmiesService } from "src/app/modules/game-modes/services/armies/armies.service";
import { MyProfileStore } from "src/app/modules/my-profile/stores/my-profile.store";
import { UtilizeTile } from "../../commands/state-transitions/round/utilize-tile.command";
import { GameData } from "../../models/game-data";
import { ProfilesRepositoryService } from "../../services/profiles-repository/profiles-repository.service";
import { HexChess } from "hexchess-game-logic";
import { GameDispatcher } from "hexchess-game-logic/dist/lib/state/game-dispatcher";
import { EventService } from "hexchess-game-logic/dist/lib/events/event-service";
import { StateGenerator } from "hexchess-game-logic/dist/lib/state/state-generator";
import { CoordsHelper } from "hexchess-game-logic/dist/lib/features/board/coords-helper";
import { ArmyHelper } from "hexchess-game-logic/dist/lib/features/army/army-helper";
import { GameHelper } from "hexchess-game-logic/dist/lib/features/game/game-helper";


@Component({
  selector: 'play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.scss'],
})
export class PlayViewComponent implements OnInit, OnDestroy {

  players: any;
  myProfile: any;

  private _destroyed: Subject<void> = new Subject();

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _commandBusService: CommandBusService,
    private readonly _commandsStack: CommandsStackService,
    private readonly _defaultHandler: DefaultCommandsHandler,
    //private readonly _loggerService: LoggerService,
    private readonly _command: CommandsFactory,
    private readonly _myProfileStore: MyProfileStore,
    private readonly _profilesRepository: ProfilesRepositoryService,
    private readonly _armiesService: ArmiesService,
    private readonly _configService: ConfigurationService,
  ) { }

  ngOnInit(): void {

    const gameData: GameData = this._route.snapshot.data.gameData;

    if (!gameData) {
      throw new Error('No game data provided');
    }

    // this._commandBusService.useMapper(this._loggerService)
    // this._commandBusService.useFilter(this._stateTransitionService);
    this._commandBusService.useHandler<RevertableCommand>(this._commandsStack);
    this._commandBusService.useHandler<BaseCommand>(this._defaultHandler);

    const stateGenerator = new StateGenerator(ArmyHelper, CoordsHelper, GameHelper);
    const game = new HexChess(
      new GameDispatcher(stateGenerator),
      new EventService()
    )

    // forkJoin({
    //   badges: this._armiesService.getArmiesBadges(),
    //   profiles: this._profilesRepository.getProfiles(gameData.armyAssignments.map(a => a.id)),
    //   myProfile: this._myProfileStore.state.pipe(first()),
    //   gameData: of(gameData)
    // })
    //   .pipe(
    //     map(feed => this.mapMyProfile(feed)),
    //     map(feed => this.mapProfiles(feed)),
    //     takeUntil(this._destroyed)
    //   )
    //   .subscribe(feed => {
    //     const cfg = {
    //       mode: GameMode.Skirmish,
    //       playersNumber: feed.profiles.length,
    //       players: feed.profiles as unknown as PlayerDeclaration[],
    //       startingLife: 20,
    //       boardSize: 5,
    //       drawPerTurn: 3
    //     }
    //     const state = stateGenerator.createInitialState(cfg);
    //     game.initialize(state, feed.myProfile as unknown as Player);

    //     this.players = feed.profiles;
    //     this.myProfile = feed.myProfile;

    //     this._command.create(InitializeGame).setParameters().dispatch();
    //   });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }


  // private mapMyProfile(feed: GameplayFeed): GameplayFeed {
  //   const armyId = feed.gameData.armyAssignments.find(d => d.profileId === feed.me.id)?.armyId;
  //   const armyBadge = feed.badges.find(b => b.id === armyId);
  //   feed.me = Object.assign(feed.me, {
  //     avatarUrl: `${this._configService.avatarsBlobStorageUrl}/${feed.me.avatar}`,
  //     armyBadge: armyBadge,
  //     armyId: armyId
  //   });
  //   return feed;
  // }

  // private mapProfiles(feed: GameplayFeed): GameplayFeed {
  //   // move this mapping to spearate file, or dedicated abstraction
  //   feed.players = feed.gameData.armyAssignments.map(a => {
  //     const profile = feed.players.find(p => p.id === a.profileId) as any;
  //     profile.armyId = a.armyId;
  //     profile.avatarUrl = this._configService.avatarsBlobStorageUrl + '/' + profile.avatarUrl
  //     profile.armyBadge = feed.badges.find(b => b.id === a.armyId);
  //     return profile;
  //   });
  //   return feed as typeof feed & { profiles: any[] }
  // }

// --------------------------------------------------------

  public startUtilizingTile(tileId: string) {
    this._command.create(UtilizeTile).setParameters(tileId).dispatch();
  }


  async pickTiles(): Promise<any> {

  }

  async finishRound(): Promise<any> {

  }

}
