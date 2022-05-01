import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, delay, finalize, switchMap } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/core';

import { slideIn } from 'src/app/shared/animations/predefined-animations';
import { AccountValidators } from 'src/app/shared/validators/account.validator';
import { ProfileValidators } from 'src/app/shared/validators/unique-profile.validator';
import { MyAccount } from '../../models/my-account';
import { MyProfile } from '../../models/profile';
import { ProfileService } from '../../providers/profile-service/profile.service';
import { MyAccountStore } from '../../stores/account.store';
import { MyProfileStore } from '../../stores/my-profile.store';
import { IntegratedInputComponent } from '../integrated-input/integrated-input.component';

@Component({
  selector: 'app-my-profile-view',
  templateUrl: './my-profile-view.component.html',
  styleUrls: ['./my-profile-view.component.scss'],
  providers: [ ProfileValidators, AccountValidators ],
  animations: [
    slideIn('slideIn')
  ]
})
export class MyProfileViewComponent implements OnInit {

  public profile: MyProfile = new MyProfile();
  public account: MyAccount = new MyAccount();

  public avatarUrl: string | undefined;

  constructor(
    private readonly _myProfileStore: MyProfileStore,
    private readonly _myAccountStore: MyAccountStore,
    private readonly _configurationService: ConfigurationService,
    private readonly _changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void { 
    this._myProfileStore.state
      .subscribe(profile => {
        this.profile = profile
        this.avatarUrl = this._configurationService.avatarsBlobStorageUrl + '/' + profile.avatar;
      });
  
    this._myAccountStore.state
      .subscribe(account => {
        this.account = account;
        this._changeDetector.markForCheck();
      });
  }

  public updateAccount(account: Partial<MyAccount>, input?: IntegratedInputComponent): void {
    this._myAccountStore.update(account)
      .pipe(
        delay(2000),
        catchError(err => {
          if (!!input)
            input.setFailureState();
          return throwError(err);
        }),
        finalize(() => !!input && input.setSuccessState())
      )
      .subscribe()
  }

  public updateProfile(nickname: string, input: IntegratedInputComponent): void {
    const newProfile = Object.assign({}, this.profile);
    newProfile.nickname = nickname;

    this._myProfileStore.update(newProfile)
      .pipe(delay(2000))
      .subscribe(
        () => input.setSuccessState(), 
        () => input.setFailureState()
      )
  }

  public updateAvatar(file: File): void {
    this._myProfileStore.updateAvatar(file);
  }

}
