import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { fadeOutAnimation } from 'src/app/shared/animations/animations/fade-out.animation';
import { fadeIn, slideIn } from 'src/app/shared/animations/predefined-animations';
import { MatchmakingService } from '../../services/matchmaking/matchmaking.service';
import { JwtParser } from 'src/app/utils/jwt-parser/jwt-parser.service';
import { MatchmakingCompletedEvent, MatchmakingRejectedEvent, RoomPlayersUpdateEvent } from '../../models/events';
import { combineLatest, Subject } from 'rxjs';
import { MatchmakingPlayerDto } from '../../models/matchmaking-player';
import { OponentsService } from '../../services/oponents/oponents.service';
import { MyProfileStore } from 'src/app/core/my-profile/stores/my-profile.store';
import { MatchedPlayer } from '../../models/matched-player';
import { ArmiesService } from 'src/app/core/armies/api';
import { IArmyBadge } from 'src/app/core/armies/models/army-badge';
import { IProfileDto } from 'src/app/core/profiles/api';
import { IMatchmakingTokenDto } from '../../models/matchmaking-token.dto';
import { RoutingService } from 'src/app/aspects/navigation/api';


@Component({
  selector: 'app-matchmaking-view',
  templateUrl: './matchmaking-view.component.html',
  styleUrls: ['./matchmaking-view.component.scss'],
  animations: [
    slideIn('slideInFromLeft', 'fromLeft'),
    slideIn('slideInFromRight', 'fromRight'),
    fadeIn('fadeIn'),
    trigger('fadeOut', [
      transition('void => success', useAnimation(fadeOutAnimation(), { params: { duration: '200ms', delay: '0ms' }})),
      state('success', style({
        opacity: 0,
      })),
    ])
  ]
})
export class MatchmakingViewComponent implements OnInit, OnDestroy {
  public ready: boolean;
  public myProfile: MatchedPlayer;
  public oponentTop: MatchedPlayer | undefined;
  public oponentRight: MatchedPlayer | undefined;
  public oponentBottom: MatchedPlayer | undefined;
  public animation: string = 'void';

  public numberOfPlayers: number = 0;
  public myProfileId: string;

  public armyBadges: IArmyBadge[];

  private _destroy$: Subject<void> = new Subject();
  private _cancel$: Subject<void> = new Subject();

  constructor(
    private readonly _routingService: RoutingService,
    private readonly _matchmakingService: MatchmakingService,
    private readonly _oponentsService: OponentsService,
    private readonly _armiesService: ArmiesService,
    private readonly _route: ActivatedRoute,
    private readonly _jwtParser: JwtParser,
    private readonly _myProfileStore: MyProfileStore
  ) { }

  ngOnInit(): void {

    combineLatest({
      myProfile: this._myProfileStore.state,
      params: this._route.params,
      armiesBadges: this._armiesService.getArmyBadges()
    })
      .pipe(
        tap(r => { this.armyBadges = r.armiesBadges; }),
        map(r => { 
          const token = Object.assign(this._jwtParser.decodeV2<IMatchmakingTokenDto>(r.params.id), { raw: r.params.id })
          this.myProfile = this._mapToMatchedPlayer(this._myProfileStore.currentState, token.choosenArmyId);

          this.myProfileId = token.playerId;
          this.numberOfPlayers = token.requiredPlayers;

          return token;
        }),
        switchMap((token: IMatchmakingTokenDto) => this._matchmakingService.joinRoom(token.raw)),
        tap(event => this._realizeStrategyForGivenState(event)),
        filter(event => event instanceof MatchmakingCompletedEvent),
        takeUntil(this._destroy$)
      )
      .subscribe((event: MatchmakingCompletedEvent) => { 
        this._routingService.navigateToGame(event.token);
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next(); 
    this._cancel$.next();
  }

  public leaveMatchmaking(): void {
    this._matchmakingService.leaveRoom();
    this._routingService.navigateToLobby();
  }

  private _realizeStrategyForGivenState(event: any): void {
    if (event instanceof RoomPlayersUpdateEvent) {

      this._updateOponentsForView(event.players)
      if (event.players.length === this.numberOfPlayers)
        this._matchmakingService.confirmReadiness();
    
    } else if (event instanceof MatchmakingRejectedEvent) {
      this.leaveMatchmaking();       
    }
  }

  private _updateOponentsForView(players: MatchmakingPlayerDto[]): void {
    const oponents = players.filter(p => p.id !== this.myProfileId);
    this._cancel$.next();

    this._oponentsService.getOponentsProfiles(oponents.map(o => o.id))
      .pipe(
        map(ps => oponents.map(o => Object.assign(o, ps.find(p => p.id === o.id)))
            .map(o => this._mapToMatchedPlayer(o, o.armyId))
        ),
        takeUntil(this._cancel$)
      )
      .subscribe(oponents => {
        this.oponentRight = oponents[0];
        this.oponentTop = oponents[1];
        this.oponentBottom = oponents[2];
      });
  }


  private _mapToMatchedPlayer(profile: IProfileDto, armyId: string): MatchedPlayer {
    return {
      army: this.armyBadges.find(ab => ab.armyId === armyId),
      avatarUrl: profile.avatarUrl,
      name: profile.nickname
    }
  } 

}