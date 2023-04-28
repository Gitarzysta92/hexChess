import { Component } from '@angular/core';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'password-recovery-view',
  templateUrl: './password-recovery-view.component.html',
  styleUrls: ['./password-recovery-view.component.scss']
})
export class PasswordRecoveryViewComponent {

  public email: string;
  public processing: boolean = false;

  constructor(
    private readonly _accountService: AccountService,
    private readonly _routingService: RoutingService
  ) { }

  public sendRecoveryLink() {
    this._accountService.sendRecoveryLink(this.email)
      .subscribe(() => this._routingService.nagivateToLogin())
  }
}
