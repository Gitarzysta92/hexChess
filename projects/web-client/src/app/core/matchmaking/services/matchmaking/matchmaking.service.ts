import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, switchMap, merge, map } from "rxjs";
import { ConfigurationService } from "src/app/infrastructure/configuration/api";
import { WrappedSocket } from "src/app/utils/ng-web-sockets/ng-web-sockets.service";
import { RoomPlayersUpdateEvent, MatchmakingCompletedEvent, MatchmakingRejectedEvent } from "../../models/events";
import { IMatchmakingRequestDto } from "../../models/quickmatch-request.dto";

@Injectable()
export class MatchmakingService {
  private _endpointPath: string = '/matchmaking'

  constructor(
    private readonly _socket: WrappedSocket,
    private readonly _httpClient: HttpClient,
    private readonly _config: ConfigurationService,
  ) { }

  requestForQuickMatch(payload: IMatchmakingRequestDto): Observable<any> {
    return this._httpClient.post(this._config.apiUrl + this._endpointPath + '/quickmatch', payload, { responseType: 'text' })
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