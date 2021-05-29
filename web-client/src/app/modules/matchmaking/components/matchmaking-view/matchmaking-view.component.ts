import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Army } from 'src/app/core/models/army';
import { RoutingService } from 'src/app/core/services/routing-service/routing.service';
import { armies } from 'src/app/core/services/utility-service/utility.service';
import { fadeOutAnimation } from 'src/app/shared/animations/animations/fade-out.animation';
import { fadeIn, fadeOut, slideIn } from 'src/app/shared/animations/predefined-animations';
import { MatchedPlayer } from '../player-badge/player-badge.component';

@Component({
  selector: 'app-matchmaking-view',
  templateUrl: './matchmaking-view.component.html',
  styleUrls: ['./matchmaking-view.component.scss'],
  animations: [
    slideIn('slideInFromLeft', 'fromLeft'),
    slideIn('slideInFromRight', 'fromRight'),
    fadeIn('fadeIn'),
    trigger('fadeOut', [
      transition('void => success', useAnimation(useAnimation(fadeOutAnimation(), { params: { duration: '200ms', delay: '0ms' }})))
    ])
  ]
})
export class MatchmakingViewComponent implements OnInit {
  oponent: MatchedPlayer;
  ready: boolean;
  myProfile: MatchedPlayer;
  animation: string = 'void';

  constructor(
    private readonly _routingService: RoutingService
  ) { }

  ngOnInit(): void {
    this.myProfile = new MatchedPlayer({
      army: new Army(armies[0]),
      avatar: '/assets/images/avatar.png',
      name: 'lorem ipsum'
    });

    timer(1000)
      .subscribe(x => {
        this.oponent = new MatchedPlayer({
          army: new Army(armies[1]),
          avatar: '/assets/images/avatar.png',
          name: 'lorem ipsum'
        });

        this.ready = true;

        timer(3000)
          .pipe(tap(() => this.animation = "success"))
          .pipe(delay(1000))
          .subscribe(x => {
            this._routingService.navigateToGame('test');
          })
      })
  }

}
