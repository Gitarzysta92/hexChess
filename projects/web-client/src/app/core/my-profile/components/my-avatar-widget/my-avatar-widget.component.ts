import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, switchMap } from 'rxjs/operators';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { ConfigurationService } from 'src/app/infrastructure/configuration/api';
import { BlobService } from 'src/app/utils/blob/blob.service';
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
      .pipe(switchMap(p => this._blobService.getBlobAsObjectUrl(containerName, p.avatarFileName)))
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
