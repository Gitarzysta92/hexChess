import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { TextInputConfig } from 'src/app/shared/components/text-input/text-input.component';
import { CustomValidators } from 'src/app/shared/validators/custom.validator';
import { ProfileValidators } from 'src/app/shared/validators/unique-profile.validator';
import { AuthPolicies, PoliciesToken } from '../../constants/policies';



@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  providers: [ ProfileValidators ]
})
export class RegistrationFormComponent {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter(); 

  public processing: boolean = false;
  public formConfig: { [key: string]: TextInputConfig };

  constructor(
    private readonly _profileValidators: ProfileValidators,
    @Inject(PoliciesToken) public readonly policies: AuthPolicies
  ) {
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

  public submitForm(form: FormGroup): void {
    if (form.valid) {
      this.processing = true;
      this.onSubmit.next({ 
        value: form.value, 
        resolve: () => this.processing = false,
        reject: () => this.processing = false,
      });
    }  
  }
}



