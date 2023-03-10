import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICONS, IconsToken } from 'src/app/shared/constants/icons';


@Component({
  selector: 'user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter(); 

  public processing: boolean = false;

  constructor(
    @Inject(IconsToken) public readonly icon: typeof ICONS
  ) {
  }

  ngOnInit(): void {
  }

  public submitForm(form: FormGroup): void {
    if (form.valid) {
      this.processing = true;
      this.onSubmit.next({ 
        value: form.value, 
        resolve: () => this.processing = false,
        reject: () => {
          this.processing = false
          form.get('password').setValue(null, { emitEvent: false });
        },
      });
    }  
  }
}
