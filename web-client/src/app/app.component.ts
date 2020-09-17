import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user-service/user.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web-client';

  constructor(
    private readonly _userService: UserService
  ) { }


  ngOnInit() {
    // const payload = jwt_decode(this._userService.token);
    // this._userService.token && this._userService.refreshToken();
  }
}
