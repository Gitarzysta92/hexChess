import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutingService } from 'src/app/core/services/routing-service/routing.service';
import { UserService } from 'src/app/core/services/user-service/user.service';
import { GameSessionService } from 'src/app/modules/matchmaking/services/game-session/game-session.service';


@Component({
  selector: 'app-main-menu-view',
  templateUrl: './main-menu-view.component.html',
  styleUrls: ['./main-menu-view.component.scss']
})
export class MainMenuViewComponent implements OnInit {

  constructor(
    private readonly _router: Router,
    private readonly _userService: UserService,
    private readonly _routingService: RoutingService
  ) { }

  ngOnInit(): void {}

  requestForQuickmatch() {
    //console.log(this._router);
  }


  logout() {
    this._userService.unauthenticate();
    this._routingService.nagivateToLogin();
  }

}
