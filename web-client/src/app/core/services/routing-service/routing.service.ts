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
    this._router.navigate(['/account/log-in']);
  }

  navigateToRegistration() {
    this._router.navigate(['/account/register']);
  }

  navigateToPasswordRecovery() {
    this._router.navigate(['/account/recovery']);
  }

  navigateToMyProfile() {
    this._router.navigate(['/profile/me']);
  }

  navigate(fragments: string[]): void {
    const serializedFragments = fragments.reduce((acc, fragment) => `${acc}/${fragments}`, "");

    const isAbsolute = serializedFragments.charAt(0) === '/';
    const url = isAbsolute ? serializedFragments : (this._router.url + serializedFragments);
    console.log(url);

    const urlTree = this._router.parseUrl(url);
    this._router.navigateByUrl(urlTree);
  }

}
