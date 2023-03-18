import { Component, Inject, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { NOTIFY_DURATION_MS } from 'src/app/aspects/notifications/api';
import { IdentityNotifications, IdentityNotificationsToken } from '../../constants/notifications';
import { AuthPolicies, PoliciesToken } from '../../constants/policies';
import { TERMS_AND_CONDITIONS_URL } from '../../constants/terms-and-conditions-url';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';


@Component({
  templateUrl: './registration-view.component.html',
  styleUrls: ['./registration-view.component.scss']
})
export class RegistrationViewComponent implements OnInit {

  public notifications: Notification[] = [];
  public notifyDuration: number = NOTIFY_DURATION_MS;
  public termsAndConditionsUrl: string = TERMS_AND_CONDITIONS_URL;

  constructor(
    private readonly _user: UserService,
    private readonly _routing: RoutingService,
    @Inject(IdentityNotificationsToken) private readonly _notification: IdentityNotifications,
    @Inject(PoliciesToken) public readonly policies: AuthPolicies,
  ) { }

  ngOnInit(): void {
  }

  public registerUser(submission: any): void {
    const newUser = new User(submission.value as any);
    this._user.register(newUser)
      .subscribe(result => {
        setTimeout(() => this._routing.nagivateToLogin(), this.notifyDuration);     
        this._showNotify('200');
        submission.resolve();
      }, err => {
        this._showNotify('404');
        submission.reject();
      })
  }

  private _showNotify(err: any): void {
    let notify;

    switch(err) {
      case '404':
        notify = this._notification.badCredentials;
        break;
      case '200':
        notify = this._notification.registrationSuccess;
        break;
    };
    
    notify && this.notifications.push(notify);
  }

  public removeNotify(notify: Notification): void {
    this.notifications = this.notifications.filter(n => n != notify);
  }

}
