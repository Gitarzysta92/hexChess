import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, filter, mapTo, switchMap, tap } from 'rxjs/operators';
import { RoutingService } from 'src/app/core';
import { armies } from 'src/app/modules/game-modes/services/armies/armies.service';
import { GameToken } from 'src/app/modules/gameplay/models/game-data';

import { fadeOutAnimation } from 'src/app/shared/animations/animations/fade-out.animation';
import { fadeIn, slideIn } from 'src/app/shared/animations/predefined-animations';
import { MatchmakingRoom, MatchmakingService, MatchmakingToken } from '../../services/matchmaking/matchmaking.service';
import { Army, MatchedPlayer } from '../player-badge/player-badge.component';




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
export class MatchmakingViewComponent implements OnInit {
  oponent: MatchedPlayer;
  ready: boolean;
  myProfile: MatchedPlayer;
  animation: string = 'void';

  playersLimit: number;

  constructor(
    private readonly _routingService: RoutingService,
    private readonly _matchmakingService: MatchmakingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
   

    
    this.route.params
      .pipe(
        tap((token: MatchmakingToken) => {
          this.myProfile = this._getMyProfileFromToken(token);
        }),
        // TODO: Check if all seats are reserverd, if no, add players.
        // If yes, display proper notification.
        switchMap((token: MatchmakingToken) => this._matchmakingService.joinRoom(token)),
        tap((room: MatchmakingRoom) => {
          this.playersLimit = room.players.length;
        }),
        switchMap((room: MatchmakingRoom) => room.whenOponentsEntersRoom()),
        tap((players: any) => this._setOponents(players)),
        filter((players: any) => players.length === this.playersLimit),
        tap(() => this.ready = true),
        mapTo(this._matchmakingService.getCurrentRoom()),
        switchMap((room: MatchmakingRoom) => room.whenGameStart()),
        tap(() => this.animation = "success"),
        //delay(2000)
      )
      .subscribe((gameData: GameToken) => {              
        this._routingService.navigateToGame(gameData);
      });
  }

  private _setOponents(players: any): void {
    this.oponent = players[1];
  }

  private _getMyProfileFromToken(token: MatchmakingToken): any {
    return {
      army: new Army(armies[0]),
      avatar: '/assets/images/avatar.png',
      name: 'lorem ipsum'
    }
  } 

}