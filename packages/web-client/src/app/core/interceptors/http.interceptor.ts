import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResourcesInterceptor implements HttpInterceptor {

  private _procesingRequests: HttpRequest<unknown>[];

  constructor() {
    this._procesingRequests = [];
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this._registerRequest(request)



    return next.handle(request).pipe(tap(req => this._clearRequest(request)));
  }

  private _registerRequest(req: HttpRequest<unknown>): void {
    this._procesingRequests.push(req);
  }

  private _clearRequest(req: HttpRequest<unknown>): void {
    this._procesingRequests = this._procesingRequests.filter(r => r != req);
    //if (this._procesingRequests.length === 0) this._userService.settled = true;
  }

}
