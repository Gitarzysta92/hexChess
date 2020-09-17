import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map, tap } from 'rxjs/operators';
import { WrappedSocket } from 'src/app/libs/ng-web-sockets/ng-web-sockets.service';
 
@Injectable()
export class GameSessionService {
 
    constructor(
        private readonly _socket: WrappedSocket,
        private readonly _httpClient: HttpClient
    ) { 

        this._socket.connect();
    }
 
    sendMessage(msg: string){
        this._socket.emit("message", msg);
    }

    getMessage() {
         return this._socket
             .fromEvent("message")
             .pipe(map((data) => (data as any).msg));
    }

    requestForQuickMatch() {
        return this._httpClient.get('http://localhost:3000/start/quickmatch', { responseType: 'text'})
    }

    
    listenForRequestApproval(roomName: string) {
        console.log('listen for request');
        this._socket.changeRoom(roomName);
        return this._socket.fromEvent("players-matched");
    }
}