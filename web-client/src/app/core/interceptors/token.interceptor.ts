import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user-service/user.service';
import { catchError, tap } from 'rxjs/operators';
import { RoutingService } from '../services/routing-service/routing.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private readonly _userService: UserService,
    private readonly _routingService: RoutingService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = this._userService.token;
    if (userToken == null) return next.handle(req);

    const modifiedReq = req.clone({ 
      headers: req.headers.set('Authorization', `Bearer ${userToken}`),
    });
    return next.handle(modifiedReq)
      .pipe(catchError(err => {
        if ((err as HttpErrorResponse).status === 401) {
          this._userService.unauthenticate();
          this._routingService.nagivateToLogin();
        }
        return of(err)
      }))
      //.pipe(tap(res => console.log(res)));
  }
}
