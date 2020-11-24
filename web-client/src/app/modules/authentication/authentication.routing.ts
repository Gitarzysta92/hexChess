import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { PasswordRecoveryViewComponent } from './components/password-recovery-view/password-recovery-view.component';
import { RegistrationViewComponent } from './components/registration-view/registration-view.component';



const routes: Routes = [
  { path: '',  pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginViewComponent },
  { path: 'register', component: RegistrationViewComponent  },
  { path: 'recovery', component: PasswordRecoveryViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
