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
    this._router.navigate(['']);
  }

  nagivateToLogin() {
    this._router.navigate(['/login']);
  }
}
