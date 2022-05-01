import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ConfigurationService, RoutingService } from 'src/app/core';
import { BlobService } from 'src/app/core/services/blob/blob.service';

import { MyProfileStore } from '../../stores/my-profile.store';


@Component({
  selector: 'my-avatar-widget',
  template: `
  <div class="img-wrapper" (click)="navigateToMyProfile()">
    <img [src]="(avatar | async)" (error)="setDefaultAvatar($event)" />
  </div>
  `,
  styleUrls: ['./my-avatar-widget.component.scss']
})
export class MyAvatarWidgetComponent implements OnInit {
  avatar: any;

  constructor(
    private readonly _myProfileStore: MyProfileStore,
    private readonly _configService: ConfigurationService,
    private readonly _blobService: BlobService,
    private readonly _routingService: RoutingService,
    private readonly _sanitizer: DomSanitizer
  ) { 
    const containerName = this._configService.avatarsContainerName;

    this.avatar = this._myProfileStore.state
      .pipe(switchMap(p => this._blobService.getBlobAsObjectUrl(containerName, p.avatar)))
      .pipe(map(r => !!r && this._sanitizer.bypassSecurityTrustUrl(r)))
  }

  ngOnInit(): void {
  }

  public navigateToMyProfile(): void {
    this._routingService.navigateToMyProfile();
  }

  public setDefaultAvatar(event: any) {
    event.target.src = 'assets/images/avatar.png';
  }

}
