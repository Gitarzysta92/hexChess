import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthenticationGuard } from './guards/authentication.guard';

import { ROOT_PATH as _ROOT_PATH, routes as _routes } from './authentication.routing';
export namespace Authentication {
  export const ROOT_PATH = _ROOT_PATH;
  export const routes = _routes;
  export const guard = AuthenticationGuard;
  export const Interceptor = TokenInterceptor;
} 

