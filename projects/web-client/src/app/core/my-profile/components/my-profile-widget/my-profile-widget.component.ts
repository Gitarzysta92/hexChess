import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/infrastructure/configuration/api';
import { IMyProfileDto } from '../../models/my-profile.dto';
import { MyProfileStore } from '../../stores/my-profile.store';


@Component({
  selector: 'my-profile-widget',
  templateUrl: './my-profile-widget.component.html',
  styleUrls: ['./my-profile-widget.component.scss']
})
export class MyProfileWidgetComponent implements OnInit {

  public profile: Observable<IMyProfileDto>

  @Input() active: boolean = false;

  @HostBinding('class.active') get setActive() {
    return this.active; 
  }

  constructor(
    private readonly _myProfileStore: MyProfileStore,
    private readonly _configService: ConfigurationService
  ) { 
    this.profile = this._myProfileStore.state
      .pipe(map(p => {
        const pCopy = Object.assign({}, p);
        if (pCopy.avatarFileName)
          pCopy.avatarFileName = `${this._configService.avatarsBlobStorageUrl}/${pCopy.avatarFileName}`;
        return pCopy;
      }));
  }

  ngOnInit(): void {
  }
}
