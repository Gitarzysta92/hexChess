import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { RoutingService } from 'src/app/core/services/routing-service/routing.service';
import { UserService } from 'src/app/core/services/user-service/user.service';

@Component({
  selector: 'app-logout-view',
  templateUrl: './logout-view.component.html',
  styleUrls: ['./logout-view.component.scss']
})
export class LogoutViewComponent implements OnInit {

  constructor(
    private readonly _routingService: RoutingService,
    private readonly _userService: UserService
  ) { }

  ngOnInit(): void {
    timer(2000)
      .subscribe(x => {
        this._userService.unauthenticate();
        this._routingService.nagivateToLogin();
      })
  }

}
