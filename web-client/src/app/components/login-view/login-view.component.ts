import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';
import { Location } from '@angular/common';
import { RoutingService } from 'src/app/services/routing-service/routing.service';

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
    this._userService.authenticate(this.loginForm.value).subscribe(isAuthenticated => {



      if (isAuthenticated) {
        this._routingService.navigateBack();
      } 

      this.processing = false;
    }, err => {
      console.log(err)
      this.processing = false;
    })
  }

}
