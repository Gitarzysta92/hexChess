import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Army } from 'src/app/core/models/army';
import { RoutingService } from 'src/app/core/services/routing-service/routing.service';
import { armies } from 'src/app/core/services/utility-service/utility.service';
import { MatchedPlayer } from '../player-badge/player-badge.component';

@Component({
  selector: 'app-matchmaking-view',
  templateUrl: './matchmaking-view.component.html',
  styleUrls: ['./matchmaking-view.component.scss']
})
export class MatchmakingViewComponent implements OnInit {
  oponent: MatchedPlayer;
  ready: boolean;
  myProfile: MatchedPlayer;

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

        timer(2000)
          .subscribe(x => {
            this._routingService.navigateToGame('test');
          })
      })
  }

}
