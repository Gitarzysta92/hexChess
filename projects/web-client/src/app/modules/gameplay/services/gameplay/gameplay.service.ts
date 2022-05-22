import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, merge, map, delay } from 'rxjs';
import { ConfigurationService, RoutingService } from 'src/app/core';
import { RoomPlayersUpdateEvent, MatchmakingCompletedEvent, MatchmakingRejectedEvent } from 'src/app/modules/matchmaking/models/events';
import { WrappedSocket } from 'src/app/utils/ng-web-sockets/ng-web-sockets.service';
import { GameData } from '../../models/game-data';

@Injectable()
export class GameplayService {

  private _endpointPath: string = '/game'

  constructor(
    private readonly _socket: WrappedSocket,
    private readonly _httpClient: HttpClient,
    private readonly _config: ConfigurationService,
    private readonly _routingService: RoutingService
  ) { }
  
  requestForSessionDetails(id: string): Observable<GameData> {
    return this._httpClient.get<GameData>(`${this._config.apiUrl}/game/session/${id}`).pipe(delay(2000))
  }

  joinSession(token: string): Observable<RoomPlayersUpdateEvent | MatchmakingCompletedEvent | MatchmakingRejectedEvent> {
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

  exitGame(): void {
    this._routingService.navigateToLobby();
  }
}
