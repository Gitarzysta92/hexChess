import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { ICONS } from 'src/app/constants/icons';
import { MenuLocations } from 'src/app/constants/menu-locations.enum';
import { GuestFormComponent } from './components/guest-form/guest-form.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { PasswordRecoveryViewComponent } from './components/password-recovery-view/password-recovery-view.component';
import { PasswordResetViewComponent } from './components/password-reset-view/password-reset-view.component';
import { RegistrationViewComponent } from './components/registration-view/registration-view.component';
import { SessionExpiredViewComponent } from './components/session-expired-view/session-expired-view.component';
import { UserLoginFormComponent } from './components/user-login-form/user-login-form.component';
import { PasswordRecoveryGuard } from './guards/password-recovery.guard';

export const ROOT_PATH = 'account';

export const routes: Routes = [
  { path: '',  pathMatch: 'full', redirectTo: 'log-in' },
  { path: 'log-in', component: LoginViewComponent, children: [
    { path: '',  pathMatch: 'full', redirectTo: 'user' },
    { path: 'user', component: UserLoginFormComponent, data: {animation: 'User'} },
    { path: 'guest', component: GuestFormComponent, data: {animation: 'Guest'} },
  ]},
  { path: 'sign-up', component: RegistrationViewComponent  },
  { path: 'recovery', children: [
    { path: '', pathMatch: 'full', component: PasswordRecoveryViewComponent },
    { path: 'session-expired', component: SessionExpiredViewComponent },
    { 
      path:':token',
      matcher: (url: UrlSegment[]) => {
        console.log([Object.assign(url[0], { parameters: url[0].path })]);
        return url.length === 1 && url[0].path !== 'session-expired' ? ({consumed: [Object.assign(url[0], { parameters: {token: url[0].path} })]}) : null
      },
      canActivate: [PasswordRecoveryGuard], component: PasswordResetViewComponent,
      data: { onFailurePath: 'session-expired'}
    },
    
  ]},
  { path: 'log-out', component: LoginViewComponent, data: { menu: { location: MenuLocations.SecondaryMenu, label: 'Logout', icon: ICONS.logout } } }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
