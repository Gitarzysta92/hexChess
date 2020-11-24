import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from 'src/app/core/services/routing-service/routing.service';
import { UserService } from 'src/app/core/services/user-service/user.service';
import { ValidatrosAsync } from 'src/app/shared/validators/unique.validator';


@Component({
  selector: 'app-registration-view',
  templateUrl: './registration-view.component.html',
  styleUrls: ['./registration-view.component.scss']
})
export class RegistrationViewComponent implements OnInit {

   public form: FormGroup;

  constructor(
    private readonly _user: UserService,
    private readonly _formBuilder: FormBuilder,
    private readonly _routing: RoutingService
  ) { 
    this.form = this._formBuilder.group({
      nickname: ["", Validators.required, ValidatrosAsync.unique(nickname => this._user.searchProfile({nickname}))],
      email: ["", Validators.required, ValidatrosAsync.unique(email => this._user.searchProfile({email}))],
      password: ["", Validators.required]
    });
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    if (!this.form.valid) return;
    this._user.register(this.form.value)
      .subscribe(result => {
        this._routing.nagivateToLogin();
      })
  }

}
