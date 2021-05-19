import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GameModeType } from 'src/app/constants/game-mode-type.enum';


@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  public onNavigationStart: Observable<NavigationStart>;
  public onNavigationEnd: Observable<NavigationEnd>;

  constructor(
    private _router: Router
  ) { 
    this.onNavigationStart = this._router.events
      .pipe(filter(event => event instanceof NavigationStart)) as any;

    this.onNavigationEnd = this._router.events
      .pipe(filter(event => event instanceof NavigationEnd)) as any;  

  }

  navigateBack() {
    this._router.navigate(['/lobby']);
  }

  navigateToLobby() {
    this._routerNavigate(['/lobby'])
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

  navigateToMatchmaking(type: GameModeType, players: number): void {
    this._routerNavigate(['/matchmaking'], { type,  players })
  }

  navigateToGame(gameId: string): void {
    this._routerNavigate(['/game', gameId])
  }

  navigate(fragments: string[]): void {
    const serializedFragments = fragments.reduce((acc, fragment) => `${acc}/${fragment}`, "");

    const isAbsolute = serializedFragments.charAt(0) === '/';
    const url = isAbsolute ? serializedFragments : (this._router.url + serializedFragments);

    const urlTree = this._router.parseUrl(url);
    this._router.navigateByUrl(urlTree);
  }

  private _routerNavigate(fragments: string[], query?: { [key: string] : string | number} ): void {
    this._router.navigate(fragments, { queryParams: query })
  }

}
