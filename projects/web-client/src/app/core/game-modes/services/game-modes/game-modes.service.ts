import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { gameModes } from '../../constants/game-modes';
import { IGameMode } from '../../models/game-mode';

@Injectable({
  providedIn: 'root'
})
export class GameModesService {

  constructor() { }

  public getGameModes(): Observable<IGameMode[]> {
    return of(gameModes)
  }
}