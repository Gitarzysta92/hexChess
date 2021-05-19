import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { MyProfile } from 'src/app/core/models/profile';
import { ConfigurationService } from 'src/app/core/services/configuration/configuration.service';
import { MyProfileStore } from 'src/app/core/services/profile.store';
import { RoutingService } from 'src/app/core/services/routing-service/routing.service';
import { UserService } from 'src/app/core/services/user-service/user.service';

@Component({
  selector: 'my-profile-widget',
  templateUrl: './my-profile-widget.component.html',
  styleUrls: ['./my-profile-widget.component.scss']
})
export class MyProfileWidgetComponent implements OnInit {

  public profile: Observable<MyProfile>

  @Input() active: boolean = false;

  @HostBinding('class.active') get setActive() {
    return this.active; 
  }

  constructor(
    private readonly _myProfileStore: MyProfileStore,
    private readonly _userService: UserService,
    private readonly _routingService: RoutingService,
    private readonly _configService: ConfigurationService
  ) { 
    this.profile = this._myProfileStore.state
      .pipe(map(p => {
        const pCopy = Object.assign({}, p);
        if (pCopy.avatar)
          pCopy.avatar = `${this._configService.avatarsBlobStorageUrl}/${pCopy.avatar}`;
        return pCopy;
      }));
  }

  ngOnInit(): void {
  }
}
