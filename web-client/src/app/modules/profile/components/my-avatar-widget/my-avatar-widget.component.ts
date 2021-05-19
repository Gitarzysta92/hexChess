import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/core/services/configuration/configuration.service';
import { MyProfileStore } from 'src/app/core/services/profile.store';
import { RoutingService } from 'src/app/core/services/routing-service/routing.service';

@Component({
  selector: 'my-avatar-widget',
  template: `
  <div class="img-wrapper" (click)="navigateToMyProfile()">
    <img src="{{ (avatar  | async) || 'assets/images/avatar.png' }}"/>
  </div>
  `,
  styleUrls: ['./my-avatar-widget.component.scss']
})
export class MyAvatarWidgetComponent implements OnInit {
  avatar: any;

  constructor(
    private readonly _myProfileStore: MyProfileStore,
    private readonly _configService: ConfigurationService,
    private readonly _routingService: RoutingService
  ) { 
    this.avatar = this._myProfileStore.state
      .pipe(map(p => `${this._configService.avatarsBlobStorageUrl}/${p.avatar}`));
  }

  ngOnInit(): void {
  }

  public navigateToMyProfile(): void {
    this._routingService.navigateToMyProfile();
  }

}
