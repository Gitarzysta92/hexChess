import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GameModeType } from 'src/app/constants/game-mode-type.enum';
import { GameToken } from 'src/app/modules/gameplay/models/game-data';


@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  public onNavigationStart: Observable<NavigationStart>;
  public onNavigationEnd: Observable<NavigationEnd>;
  parameters: any;

  constructor(
    private _router: Router,
    private route: ActivatedRoute

  ) { 
    this.onNavigationStart = this._router.events
      .pipe(filter(event => event instanceof NavigationStart)) as any;

    this.onNavigationEnd = this._router.events
      .pipe(filter(event => event instanceof NavigationEnd)) as any;

    this.parameters = this.route.params;
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

  navigateToGame(token: GameToken): void {
    this._router.navigate(['/game', token]);
  }

  navigateToNotifications(): void {
    this._routerNavigate(['/notifications'])
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
