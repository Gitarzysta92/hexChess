import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, Observable, of } from 'rxjs';
import { delay, map, mergeAll, switchMap, tap } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/core';
import { armies } from 'src/app/modules/game-modes/services/armies/armies.service';
import { GameData, gameData, GameToken } from 'src/app/modules/gameplay/models/game-data';
import { WrappedSocket } from 'src/app/utils/ng-web-sockets/ng-web-sockets.service';
import { Army, MatchedPlayer } from "../../models/matched-player";
import { MatchmakingCompletedEvent, MatchmakingRejectedEvent, RoomPlayersUpdateEvent } from '../../models/events';

export interface Player {
  id: string
};

export class MatchmakingToken {
  roomId: string;
  playerId: string;
  requiredPlayers: number;
  choosenArmy: number;
  timestamp: number;
  raw: string;
};

@Injectable()
export class MatchmakingService {
  private _endpointPath: string = '/matchmaking'

  constructor(
    private readonly _socket: WrappedSocket,
    private readonly _httpClient: HttpClient,
    private readonly _config: ConfigurationService,
  ) { }

  requestForQuickMatch(playersNumber: number, selectedArmies: number[]): Observable<any> {
    return this._httpClient.post(this._config.apiUrl + this._endpointPath + '/quickmatch', { 
      requiredPlayers: playersNumber,
      selectedArmies: selectedArmies
    }, { responseType: 'text' })
  }

  joinRoom(token: string): Observable<RoomPlayersUpdateEvent | MatchmakingCompletedEvent | MatchmakingRejectedEvent> {
    return of(this._socket.connect({ query: { token } }))
      .pipe(
        switchMap(() => merge(
          this._socket.fromEvent("players-updated").pipe(map(p => new RoomPlayersUpdateEvent(p))),
          this._socket.fromEvent("matchmaking-completed").pipe(map(p => new MatchmakingCompletedEvent(p))),
          this._socket.fromEvent("matchmaking-rejected").pipe(map(() => new MatchmakingRejectedEvent())),
          this._socket.fromEvent('disconnect').pipe(map(() => new MatchmakingRejectedEvent())),
        ))
      ) 
  }

  confirmReadiness(): void {
    this._socket.emit('confirm-readiness')
  }

  leaveRoom() {
    this._socket.disconnect();
  }
}