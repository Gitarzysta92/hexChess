import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, forkJoin, map, Subject, takeUntil } from 'rxjs';
import { ConfigurationService, RoutingService } from 'src/app/core';
import { ArmiesService } from 'src/app/modules/game-modes/services/armies/armies.service';
import { MyProfileStore } from 'src/app/modules/my-profile/stores/my-profile.store';
import { CommandsFactory } from '../../commands/commands-factory';
import { BaseCommand } from '../../lib/command-bus/base-command';
import { CommandBusService, DefaultCommandsHandler } from '../../lib/command-bus/command-bus.service';
import { CommandsStackService, RevertableCommand } from '../../lib/commands-stack/commands-stack.service';
import { GameData } from '../../models/game-data';
import { GameLoopAutoDispatcherService } from '../../services/game-loop-auto-dispatcher/game-loop-auto-dispatcher.service';
import { GameplayService } from '../../services/gameplay/gameplay.service';
import { LoggerService } from '../../services/logger/logger.service';
import { ProfilesRepositoryService } from '../../services/profiles-repository/profiles-repository.service';
import { StateTransitionValidatorService } from '../../services/state-transition-validator/state-transition-validator.service';


@Component({
  selector: 'play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.scss'],
})
export class PlayViewComponent implements OnInit, OnDestroy {

  public roomId: string;
  public gameData: GameData;
  public myProfile: any;
  public oponents: any[];

  private _destroyed: Subject<void> = new Subject();
  players: any[];

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _commandBusService: CommandBusService,
    private readonly _commandsStack: CommandsStackService,
    private readonly _defaultHandler: DefaultCommandsHandler,
    private readonly _stateTransitionService: StateTransitionValidatorService,
    private readonly _loggerService: LoggerService,
    private readonly _gameLoopAutoDispatcher: GameLoopAutoDispatcherService,
    private readonly _command: CommandsFactory,
    private readonly _gameplayService: GameplayService,
    private readonly _myProfileStore: MyProfileStore,
    private readonly _profilesRepository: ProfilesRepositoryService,
    private readonly _armiesService: ArmiesService,
    private readonly _configService: ConfigurationService,
    private readonly _routingService: RoutingService
  ) { }

  ngOnInit(): void {
    this.gameData = this._route.snapshot.data.gameData;


    if (!this.gameData) {
      throw new Error('No game data provided');
    }

    this._commandBusService.useMapper(this._loggerService)
    this._commandBusService.useFilter(this._stateTransitionService);
    this._commandBusService.useHandler<RevertableCommand>(this._commandsStack);
    this._commandBusService.useHandler<BaseCommand>(this._defaultHandler);
    this._commandBusService.useSideEffect(this._gameLoopAutoDispatcher);


    forkJoin({
      badges: this._armiesService.getArmiesBadges(),
      profiles: this._profilesRepository.getProfiles(this.gameData.armyAssignments.map(a => a.id)),
      myProfile: this._myProfileStore.state.pipe(first())
    })
      .pipe(takeUntil(this._destroyed))
      .subscribe(feed => {
        this.myProfile = this._myProfileStore.state
          .pipe(
            map(p => {
              const armyId = this.gameData.armyAssignments.find(d => d.id === p.id)?.armyId;
              const armyBadge = feed.badges.find(b => b.id === armyId);
              const profile = Object.create(p);

              profile.avatarUrl = `${this._configService.avatarsBlobStorageUrl}/${p.avatar}`;
              profile.armyBadge = armyBadge;

              return profile;
            })
          );

        this.players = this.gameData.armyAssignments.map(a => {
          const profile = feed.profiles.find(p => p.id === a.id) as any;
          profile.armyId = a.armyId;
          profile.avatarUrl = this._configService.avatarsBlobStorageUrl + '/' + profile.avatarUrl
          profile.armyBadge = feed.badges.find(b => b.id === a.armyId);
          return profile;
        });

        console.log(this.players);
 
      });


    // state shortcuts
    // merge(
    //   this._stateProvider.whenOnlyOnePlayerHaveLifePointsAboveZero,
    //   this._stateProvider.whenBattleInstantActionWasUsed
    // )
    // .subscribe(() => this._commandBusService.dispatch(this._command.create(FinishRound)));

    // // // data loading
    // const me = this._gameLoopAutoDispatcher()
      

    // const players = this._playersService.getPlayers();
    // this._playersStateService.init(players);
    
    // const game = this._gameService.getGameSettings();
    // this._gameStateService.init(game, players);

    // this._commandBusService.dispatch(this._command.create(StartGame));
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  public sendMessage(): void {
    //this._gameSession.sendMessage(this.roomId);
  }

  public navigateToLobby(): void {
    this._routingService.navigateToLobby();
  }

  public openConfirmationModal() {
    
  }

}
