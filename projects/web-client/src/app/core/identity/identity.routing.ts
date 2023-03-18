import { UrlSegment } from '@angular/router';
import { ICONS } from 'src/app/shared/icons/constants/icons';
import { MenuLocation } from 'src/app/aspects/navigation/constants/menu-location.enum';
import { RoutesAdapter } from 'src/app/aspects/navigation/services/system-routes';
import { AuthenticationGuard } from './guards/authentication.guard';
import { PasswordRecoveryGuard } from './guards/password-recovery.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';


export namespace Identity {
  export const guard = AuthenticationGuard;
  export const Interceptor = TokenInterceptor;
  
  export const ROOT_PATH = 'account';
  export const routes = new RoutesAdapter({
    root: { path: '',  pathMatch: 'full', redirectTo: 'log-in' },
    login: { path: 'log-in', children: {
      root: { path: '',  pathMatch: 'full', redirectTo: 'user' },
      user: { path: 'user', data: {animation: 'User'} },
      guest: { path: 'guest', data: {animation: 'Guest'} },
    }},
    signup: { path: 'sign-up'  },
    recovery: { path: 'recovery', children: {
      root: { path: '', pathMatch: 'full' },
      sessionExpired: { path: 'session-expired' },
      token: { 
        path:':token',
        matcher: (url: UrlSegment[]) => {
          console.log([Object.assign(url[0], { parameters: url[0].path })]);
          return url.length === 1 && url[0].path !== 'session-expired' ? ({consumed: [Object.assign(url[0], { parameters: {token: url[0].path} })]}) : null
        },
        canActivate: [PasswordRecoveryGuard],
        data: { onFailurePath: 'session-expired'}
      },
      
    }},
    logout: { path: 'log-out', data: { menu: { location: MenuLocation.SecondaryMenu, label: 'Logout', icon: ICONS.logout } } }  
  });
}