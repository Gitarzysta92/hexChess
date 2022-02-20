import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/core';
import { MyProfile } from '../../models/profile';
import { MyProfileStore } from '../../stores/my-profile.store';



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
