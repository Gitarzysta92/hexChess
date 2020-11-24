import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthenticationRoutingModule } from './authentication.routing';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { RegistrationViewComponent } from './components/registration-view/registration-view.component';
import { PasswordRecoveryViewComponent } from './components/password-recovery-view/password-recovery-view.component';





@NgModule({
  declarations: [
    LoginViewComponent,
    RegistrationViewComponent,
    PasswordRecoveryViewComponent,  
  ],
  imports: [
    SharedModule,
    AuthenticationRoutingModule
  ],
  providers: []
})
export class AuthenticationModule { }
