import { Component, Inject, OnInit } from '@angular/core';

import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { Subscription } from 'rxjs';
import { AuthNotifications, NotificationsToken } from '../../constants/notifications';
import { GuestFormComponent } from '../guest-form/guest-form.component';
import { HttpErrorResponse } from '@angular/common/http';
import { RoutingService } from 'src/app/core';
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('User => Guest', [
        style({ position: 'relative' }),
        query(':enter', [
          style({ 
            transform: 'translate(150%, 0)',
            display: 'block',
          })
        ]),
        query(':leave', [
          style({ 
            transform: 'translate(0, 0)',
            display: 'block',
            position: 'absolute'
          })
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('150ms ease-out', style({ transform: 'translate(-150%, 0)' }))
          ]),
          query(':enter', [
            animate('150ms 100ms ease-out', style({ transform: 'translate(0, 0)' }))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
      transition('Guest => User', [
        style({ position: 'relative' }),
        query(':enter', [
          style({ 
            transform: 'translate(-150%, 0)',
            display: 'block',
          })
        ]),
        query(':leave', [
          style({ 
            transform: 'translate(0, 0)',
            display: 'block',
            position: 'absolute'
          })
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('150ms ease-out', style({ transform: 'translate(200%, 0)' }))
          ]),
          query(':enter', [
            animate('150ms 150ms ease-out', style({ transform: 'translate(0, 0)' }))
          ])
        ]),
        query(':enter', animateChild()),
      ]),
    ])
  ]
})
export class LoginViewComponent implements OnInit {

  public mode: string = "user";
  private _formSubscription: Subscription;

  public notifications: Notification[] = [];

  constructor(
    private readonly _routingService: RoutingService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _userService: UserService,
    @Inject(NotificationsToken) private readonly _notification: AuthNotifications,
  ) { }

  ngOnInit(): void {}

  public toggleMode(mode: string) {
    this._router.navigate([mode], { relativeTo: this._route });
    this.mode = mode;
  }

  public navigateToRegistration(): void {
    this._routingService.navigateToRegistration();
  }
  public navigateToPasswordRecovery(): void {
    this._routingService.navigateToPasswordRecovery();
  }

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  public onOutletLoaded(form: UserLoginFormComponent) {
    this._formSubscription && this._formSubscription.unsubscribe();
    if (form instanceof UserLoginFormComponent)
    this._formSubscription = form.onSubmit.subscribe(submission => this.loginAsUser(submission));

    if (form instanceof GuestFormComponent)
    this._formSubscription = form.onSubmit.subscribe(submission => this.loginAsGuest(submission));
  }

  public loginAsUser(submission: any): void {
    this._userService.authenticate(submission.value)
      .subscribe(isAuthenticated => {
        if (isAuthenticated) this._routingService.navigateBack();
        submission.resolve();
      }, err => {
        this._showNotify(err);
        submission.reject();
      });
  }

  public loginAsGuest(submission: any): void {
    this._userService.authenticateGuest(submission.value)
      .subscribe(isAuthenticated => {
        if (isAuthenticated) this._routingService.navigateBack();
        submission.resolve();
      }, err => {
        this._showNotify(err);
        submission.reject();
      });
  }

  private _showNotify(err: HttpErrorResponse): void {
    let notify;
    switch(err.status) {
      case 401:
        notify = this._notification.badCredentials;
        break;
      case 200:
        notify = this._notification.success;
        break;
    };

    notify && this.notifications.push({ ...notify });
  }

  public removeNotify(notify: Notification): void {
    this.notifications = this.notifications.filter(n => n != notify);
  }

}



