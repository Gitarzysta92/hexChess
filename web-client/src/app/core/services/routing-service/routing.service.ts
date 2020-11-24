import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  constructor(
    private _router: Router
  ) { }

  navigateBack() {
    this._router.navigate(['/lobby']);
  }

  nagivateToLogin() {
    this._router.navigate(['/account/login']);
  }

  navigateToRegistration() {
    this._router.navigate(['/account/register']);
  }

  navigateToPasswordRecovery() {
    this._router.navigate(['/account/recovery'])
  }
}
