import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MyProfile } from 'src/app/core/models/profile';
import { MyProfileService } from 'src/app/core/services/profile-service/profile.service';
import { RoutingService } from 'src/app/core/services/routing-service/routing.service';
import { UserService } from 'src/app/core/services/user-service/user.service';

@Component({
  selector: 'my-profile-widget',
  templateUrl: './my-profile-widget.component.html',
  styleUrls: ['./my-profile-widget.component.scss']
})
export class MyProfileWidgetComponent implements OnInit {

  public profile: MyProfile

  @Input() active: boolean = false;

  @HostBinding('class.active') get setActive() {
    return this.active; 
  }

  constructor(
    private readonly _myProfileService: MyProfileService,
    private readonly _userService: UserService,
    private readonly _routingService: RoutingService
  ) { }

  ngOnInit(): void {
    this._myProfileService.getMyProfile()
      .subscribe(profile => {
        this.profile = profile;
      });
  }

  public logout(): void {
    this._userService.unauthenticate();
    this._routingService.nagivateToLogin();
  }

}
