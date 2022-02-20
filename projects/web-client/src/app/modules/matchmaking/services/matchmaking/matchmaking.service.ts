import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { armies } from 'src/app/modules/game-modes/services/armies/armies.service';
import { GameData, gameData, GameToken } from 'src/app/modules/gameplay/models/game-data';
import { Army, MatchedPlayer } from '../../components/player-badge/player-badge.component';




export interface Player {
  id: string
};

export class MatchmakingToken {
  players: MatchedPlayer[]
};

export class MatchmakingRoom {
 
  players: MatchedPlayer[];

  constructor() {
    this.players = [ 
      {
        army: new Army(armies[0]),
        avatar: '/assets/images/avatar.png',
        name: 'lorem ipsum'
      },
      {
        army: new Army(armies[1]),
        avatar: '/assets/images/avatar.png',
        name: 'lorem ipsum'
      }
    ]; 
  }

  whenOponentsEntersRoom(): Observable<MatchedPlayer[]> {
    return of(this.players).pipe(delay(2000));
  }

  whenGameStart(): Observable<GameToken> {
    return of(gameData.id).pipe(delay(2000));;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MatchmakingService {

  room: MatchmakingRoom;

  constructor() { 

    this.room = new MatchmakingRoom()

  }

  getCurrentRoom(): MatchmakingRoom {
    return this.room;
  }
  getMatchDefininition(room: MatchmakingRoom) {
  
  }

  joinRoom(token: MatchmakingToken): Observable<MatchmakingRoom> {
    return of(this.room).pipe(delay(5000));
  }

  getGameData(gameToken: GameToken): Observable<GameData> {
    return of(gameData);
  }
}
