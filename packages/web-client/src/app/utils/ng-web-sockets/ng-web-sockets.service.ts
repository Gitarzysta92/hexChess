import { Injectable, EventEmitter, Inject, InjectionToken, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { io, Socket } from 'socket.io-client';





export const SOCKET_CONFIG_TOKEN = new InjectionToken<SocketIoConfig>('__SOCKET_IO_CONFIG__');

export interface SocketIoConfig {
  url: string;
  options?: any;
};

@Injectable()
export class WrappedSocket {
    subscribersCounter = 0;
    ioSocket: Socket;

    constructor(@Optional() @Inject(SOCKET_CONFIG_TOKEN) config: SocketIoConfig) {
        const url: string = config?.url || '';
        const options: any = config?.options || {};

        if (url.length > 0) {


 
            this.ioSocket = io(url, options);
        }  
    }

    on(eventName: string, callback: () => any) {
        this.ioSocket.on(eventName, callback);
    }

    once(eventName: string, callback: (...args: any[]) => void) {
        this.ioSocket.once(eventName, callback);
    }

    connect(options) {
        this.ioSocket


        //this.ioSocket = io(url, options);
        return this.ioSocket.connect();
    }

    disconnect(close?: any) {
        return this.ioSocket.disconnect.apply(this.ioSocket, arguments);
    }

    emit(eventName: string, data?: any, callback?: Function) {
        return this.ioSocket.emit.apply(this.ioSocket, arguments);
    }

    removeListener(eventName: string, callback?: Function) {
        return this.ioSocket.removeListener.apply(this.ioSocket, arguments);
    }

    removeAllListeners(eventName?: string) {
        return this.ioSocket.removeAllListeners.apply(this.ioSocket, arguments);
    }

    /** create an Observable from an event */
    fromEvent<T>(eventName: string): Observable<T> {
        this.subscribersCounter++;
        return new Observable<T>((observer: any) => {
             this.ioSocket.on(eventName, (data: T) => {
                 observer.next(data);
             });
             return () => {
                 if (this.subscribersCounter === 1)
                    this.ioSocket.removeListener(eventName);
            };
        }).pipe(share())
    }
   
    /* Creates a Promise for a one-time event */
    fromEventOnce<T>(eventName: string): Promise<T> {
        return new Promise<T>(resolve => this.once(eventName, resolve));
    }

    changeRoom(name: string) {
    console.log('socket-name', name);
      return this.ioSocket.on('connection', socket => {
          console.log(socket);
          socket.join(name);
        });
    }
}