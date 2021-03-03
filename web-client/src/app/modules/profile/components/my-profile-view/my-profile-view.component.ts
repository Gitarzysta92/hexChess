import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MyProfile } from 'src/app/core/models/profile';
import { MyProfileService } from 'src/app/core/services/profile-service/profile.service';
import { TextInputConfig } from 'src/app/shared/components/text-input/text-input.component';
import { CustomValidators } from 'src/app/shared/validators/custom.validator';
import { ProfileValidators } from 'src/app/shared/validators/unique-profile.validator';

@Component({
  selector: 'app-my-profile-view',
  templateUrl: './my-profile-view.component.html',
  styleUrls: ['./my-profile-view.component.scss'],
  providers: [ ProfileValidators ]
})
export class MyProfileViewComponent implements OnInit {

  public profile: MyProfile;

  public formConfig: { [key: string]: TextInputConfig };

  constructor(
    private readonly _profileValidators: ProfileValidators,
    private readonly _myProfileService: MyProfileService
  ) {
    
    this._myProfileService.getMyProfile()
      .subscribe(profile => {
        this.profile = profile;
      });
    

    this.formConfig = {
      nickname: {
        asyncValidators: [ this._profileValidators.unique('nickname') ],
        validators: [ Validators.minLength(4), Validators.maxLength(16) ]
      },
      email: {
        asyncValidators: [ this._profileValidators.unique('email') ],
        validators: [ CustomValidators.email ]
      },
      password: {
        validators: [
          Validators.minLength(8),
          Validators.maxLength(24)
          //Validators.pattern(/[A-Z]/g), 
          //Validators.pattern(/[!@#]/gi)
        ]
      }
    };
  }

  ngOnInit(): void {
  }

}
