import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameSessionService } from 'src/app/services/game-session/game-session.service';
import { RoutingService } from 'src/app/services/routing-service/routing.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-main-menu-view',
  templateUrl: './main-menu-view.component.html',
  styleUrls: ['./main-menu-view.component.scss']
})
export class MainMenuViewComponent implements OnInit {

  constructor(
    private readonly _gameSessionService: GameSessionService,
    private readonly _router: Router,
    private readonly _userService: UserService,
    private readonly _routingService: RoutingService
  ) { }

  ngOnInit(): void {}

  requestForQuickmatch() {
    //console.log(this._router);
    this._gameSessionService.requestForQuickMatch()
      .subscribe(token => {
        this._router.navigate(['searching']);
        this._gameSessionService.connectToRoom(token);

        // this._gameSessionService.listenForRequestApproval(result)
        //   .subscribe(roomId => {
        //     this._router.navigate(['play', roomId]);
        //   })
      });
  }


  logout() {
    this._userService.unauthenticate();
    this._routingService.nagivateToLogin();
  }

}
