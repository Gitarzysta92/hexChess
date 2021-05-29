import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { MyAccount } from 'src/app/core/models/my-account';
import { MyProfile } from 'src/app/core/models/profile';
import { MyAccountStore } from 'src/app/core/services/account.store';
import { MyProfileStore } from 'src/app/core/services/profile.store';
import { slideIn, slideInFromTopMultipleElements } from 'src/app/shared/animations/predefined-animations';
import { AccountValidators } from 'src/app/shared/validators/account.validator';
import { ProfileValidators } from 'src/app/shared/validators/unique-profile.validator';
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

  public profile: MyProfile;
  public account: MyAccount;



  constructor(
    private readonly _myProfileStore: MyProfileStore,
    private readonly _myAccountStore: MyAccountStore,
    private readonly _changeDetector: ChangeDetectorRef
  ) {
    this.profile = new MyProfile();
    this._myProfileStore.state
      .subscribe(profile => {
        this.profile = profile
      });
    
    this.account = new MyAccount();
    this._myAccountStore.state
      .subscribe(account => {
        this.account = account;
        this._changeDetector.markForCheck();
      })
  }

  ngOnInit(): void { }

  public updateAccount(account: MyAccount, input: IntegratedInputComponent): void {
    this._myAccountStore.update(account)
      .pipe(delay(2000))
      .subscribe(
        () => input.setSuccessState(), 
        () => input.setFailureState()
      )
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
