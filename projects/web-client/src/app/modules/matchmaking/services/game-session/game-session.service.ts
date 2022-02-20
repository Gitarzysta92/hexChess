import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { delay, map, tap } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/core';
import { gameData } from 'src/app/modules/gameplay/models/game-data';
import { WrappedSocket } from 'src/app/utils/ng-web-sockets/ng-web-sockets.service';

 
@Injectable({ providedIn: 'root' })
export class GameSessionService {

    private _endpointPath: string = '/start'
 
    constructor(
        private readonly _socket: WrappedSocket,
        private readonly _httpClient: HttpClient,
        private readonly _config: ConfigurationService,
    ) { }
 
    sendMessage(msg: string){
        this._socket.emit("message", msg);
    }

    getMessage() {
         return this._socket
             .fromEvent("message")
             .pipe(map((data) => (data as any).msg));
    }

    requestForQuickMatch(playersNumber: number): Observable<string> {
        return of(gameData.id).pipe(delay(2000))
       // return this._httpClient.get(this._config.apiUrl + this._endpointPath + `/quickmatch/${playersNumber}` , { responseType: 'text'})
    }

    
    listenForRequestApproval(roomName: string) {
        console.log('listen for request');
        this._socket.changeRoom(roomName);
        return this._socket.fromEvent("players-matched");
    }

    connectToRoom(token: string): void {
        this._socket.connect(`http://localhost:8988/matchmaking?token=${token}`);
        this._socket.fromEvent("matchmaking-resolved")
            .subscribe(msg => {
                console.log(msg);

            });

        this._socket.fromEvent("readiness-request")
            .subscribe(msg => {
                console.log(msg);
            });
    }


}