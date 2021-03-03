import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-password-recovery-view',
  templateUrl: './password-recovery-view.component.html',
  styleUrls: ['./password-recovery-view.component.scss']
})
export class PasswordRecoveryViewComponent implements OnInit {

  public email: string;

  constructor(
    private readonly _authentication: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  public sendRecoveryLink() {
    this._authentication.sendRecoveryLink(this.email);
  }

}
