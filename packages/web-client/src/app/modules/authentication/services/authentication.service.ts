import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutingService } from 'src/app/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _routerService: RoutingService
  ) { }

  public sendRecoveryLink(email: string): void {
    const token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MDY2NTc0MjAsImV4cCI6MTYzODI3OTgyMCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.TZi6JwT9DUKBs_u9u8Vk51b5aa85pGFsUz02X-CZDek";
    this._routerService.navigate([ token ]);
  }
}
