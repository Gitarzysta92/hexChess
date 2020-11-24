import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Location } from '@angular/common';
import { UserService } from 'src/app/core/services/user-service/user.service';
import { RoutingService } from 'src/app/core/services/routing-service/routing.service';


@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  public loginForm: FormGroup;
  public processing: boolean;


  constructor(
    private _userService: UserService,
    private _routingService: RoutingService
  ) {
    this.processing = false;
    this.loginForm = new FormGroup({
      login: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  public authenticate(event: Event): void {
    event.preventDefault();
    this.processing = true;
    const credentials = {
      email: this.loginForm.value.login,
      password: this.loginForm.value.password
    }
    this._userService.authenticate(credentials).subscribe(isAuthenticated => {



      if (isAuthenticated) {
        this._routingService.navigateBack();
      } 

      this.processing = false;
    }, err => {
      console.log(err)
      this.processing = false;
    })
  }


  public navigateToRegistration(): void {
    this._routingService.navigateToRegistration();
  }
  public navigateToPasswordRecovery(): void {
    this._routingService.navigateToPasswordRecovery();
  }

}
