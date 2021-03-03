import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthenticationRoutingModule, ROOT_PATH, routes } from './authentication.routing';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { RegistrationViewComponent } from './components/registration-view/registration-view.component';
import { PasswordRecoveryViewComponent } from './components/password-recovery-view/password-recovery-view.component';
import { UserLoginFormComponent } from './components/user-login-form/user-login-form.component';
import { GuestFormComponent } from './components/guest-form/guest-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { PasswordResetViewComponent } from './components/password-reset-view/password-reset-view.component';
import { SessionExpiredViewComponent } from './components/session-expired-view/session-expired-view.component';
import { NotificationsToken, notifications } from './constants/notifications';
import { policies, PoliciesToken } from './constants/policies';





@NgModule({
  declarations: [
    LoginViewComponent,
    RegistrationViewComponent,
    PasswordRecoveryViewComponent,
    UserLoginFormComponent,
    GuestFormComponent,
    RegistrationFormComponent,  
    PasswordResetViewComponent, 
    SessionExpiredViewComponent
  ],
  imports: [
    SharedModule,
    AuthenticationRoutingModule
  ],
  providers: [
    { provide: NotificationsToken, useValue: notifications },
    { provide: PoliciesToken, useValue: policies }
  ]
})
export class AuthenticationModule { 
  static path = ROOT_PATH;
  static routes = routes;
}
