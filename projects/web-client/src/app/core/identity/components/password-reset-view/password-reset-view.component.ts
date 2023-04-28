import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { JwtParser } from 'src/app/utils/jwt-parser/jwt-parser.service';
import { IPasswordResetToken } from '../../models/password-reset-token';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-password-reset-view',
  templateUrl: './password-reset-view.component.html',
  styleUrls: ['./password-reset-view.component.scss']
})
export class PasswordResetViewComponent implements OnInit {

  public rawToken: string;
  public token: IPasswordResetToken;
  public password: string;
  public visible: boolean = false;
  public processing: boolean = false;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _accountService: AccountService,
    private readonly _routingService: RoutingService,
    private readonly _jwtParser: JwtParser
  ) { }

  ngOnInit(): void {
    this.token = this._jwtParser.decodeV2<IPasswordResetToken>(this._route.snapshot.params.token);
    this.rawToken = this._route.snapshot.params.token;
  }

  public togglePaswordVisibility(): void {
    this.visible = !this.visible;
  }

  public resetPassword(): void {
    this._accountService.resetPassword(this.rawToken, { username: this.token.username, password: this.password })
      .subscribe(() => this._routingService.nagivateToLogin())
  }

}
