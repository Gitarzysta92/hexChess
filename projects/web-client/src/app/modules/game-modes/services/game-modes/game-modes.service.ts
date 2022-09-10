import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GameModeType } from "src/app/constants/game-mode-type.enum";
import { GameMode } from '../../models/game-mode';


 export const gameModes = [
    new GameMode({
      id: 1,
      type: GameModeType.Quickmatch,
      players: 2,
      name: 'Duel Quickmatch',
      description: 'Suspendisse nunc velit, dictum a lacus non, facilisis pulvinar libero. Curabitur odio ante, consequat nec felis vitae, dapibus dictum ligula. Ut faucibus porta velit ut mollis.',
      image: './assets/images/duel.jpg'
    }),
    new GameMode({
      id: 2,
      type: GameModeType.Quickmatch,
      players: 3,
      name: 'Triple Quickmatch',
      description: 'Suspendisse nunc velit, dictum a lacus non, facilisis pulvinar libero. Curabitur odio ante, consequat nec felis vitae, dapibus dictum ligula. Ut faucibus porta velit ut mollis.',
      image: './assets/images/triple.jpg'
    }),
    new GameMode({
      id: 3,
      type: GameModeType.Quickmatch,
      players: 4,
      name: 'Quad Quickmatch',
      description: 'Suspendisse nunc velit, dictum a lacus non, facilisis pulvinar libero. Curabitur odio ante, consequat nec felis vitae, dapibus dictum ligula. Ut faucibus porta velit ut mollis.',
      image: './assets/images/quad.jpg'
    }),
    new GameMode({
      id: 4,
      type: GameModeType.Hotseat,
      players: 2,
      name: 'Create Hotseat Game',
      description: 'Suspendisse nunc velit, dictum a lacus non, facilisis pulvinar libero. Curabitur odio ante, consequat nec felis vitae, dapibus dictum ligula. Ut faucibus porta velit ut mollis.',
      image: './assets/images/custom.jpg'
    })
]




@Injectable({
  providedIn: 'root'
})
export class GameModesService {

  constructor() { }

  public getGameModes(): Observable<GameMode[]> {
    return of(gameModes)
  }
}
