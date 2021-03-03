import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { RoutingService } from 'src/app/core/services/routing-service/routing.service';
import { UserService } from 'src/app/core/services/user-service/user.service';

import { AuthNotifications, NotificationsToken } from '../../constants/notifications';
import { AuthPolicies, PoliciesToken } from '../../constants/policies';


@Component({
  templateUrl: './registration-view.component.html',
  styleUrls: ['./registration-view.component.scss']
})
export class RegistrationViewComponent implements OnInit {

  public notifications: Notification[] = [];
  public notifyDuration: number = 5000;

  constructor(
    private readonly _user: UserService,
    private readonly _routing: RoutingService,
    @Inject(NotificationsToken) private readonly _notification: AuthNotifications,
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
        notify = this._notification.success;
        break;
    };
    
    notify && this.notifications.push(notify);
  }

  public removeNotify(notify: Notification): void {
    this.notifications = this.notifications.filter(n => n != notify);
  }

}
