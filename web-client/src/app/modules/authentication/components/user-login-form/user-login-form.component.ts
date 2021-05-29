import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICONS, IconsToken } from 'src/app/constants/icons';
import { RoutingService } from 'src/app/core/services/routing-service/routing.service';
import { UserService } from 'src/app/core/services/user-service/user.service';
import { slideInFromTopMultipleElements } from 'src/app/shared/animations/predefined-animations';
import { AuthNotifications, NotificationsToken } from '../../constants/notifications';


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
