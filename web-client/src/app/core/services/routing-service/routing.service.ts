import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GameModeType } from 'src/app/constants/game-mode-type.enum';


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
