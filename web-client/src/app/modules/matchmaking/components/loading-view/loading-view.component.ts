import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { RoutingService } from 'src/app/core/services/routing-service/routing.service';
import { GameSessionService } from '../../services/game-session/game-session.service';

@Component({
  selector: 'app-loading-view',
  templateUrl: './loading-view.component.html',
  styleUrls: ['./loading-view.component.scss']
})
export class LoadingViewComponent implements OnInit {

  constructor(
    private readonly _gameSessionService: GameSessionService,
    private readonly _routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this._gameSessionService.requestForQuickMatch()
      .subscribe(token => {
        this._routingService.navigate(['matchmaking', token]);
      });
  }
}



// this._gameSessionService.requestForQuickMatch()
//     .subscribe(token => {
//       this._router.navigate(['searching']);
//       this._gameSessionService.connectToRoom(token);

//       // this._gameSessionService.listenForRequestApproval(result)
//       //   .subscribe(roomId => {
//       //     this._router.navigate(['play', roomId]);
//       //   })
//     });
