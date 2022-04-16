import { OnApplicationBootstrap } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Subject } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { EventService } from 'src/core/events/event.service';
import { TokenGenerator } from 'src/utils/token-generator/token-generator';
import { MatchmakingRequestConfirmationEvent, MatchmakingRequestDetachedEvent, MatchmakingRequestReadinessCheckEvent, MatchmakingRequestResolvedEvent } from '../models/events';


@WebSocketGateway(8988, { namespace: 'matchmaking' })
export class GameSessionGateway implements OnGatewayConnection, OnGatewayDisconnect, OnApplicationBootstrap {

  @WebSocketServer()
  server: Server;

  private _sockets: Socket[];

  public onRoomJoined: Subject<string>;

  constructor(
    private readonly _eventService: EventService,
    private readonly _tokenGenerator: TokenGenerator
  ) { 
    this._sockets = [];
  }

  public initialize(): void {
    this._eventService.on([MatchmakingRequestResolvedEvent])
      .subscribe(event => {
        this._emitResolved(event.id, event.gameSessionId);
      });

    this._eventService.on([MatchmakingRequestReadinessCheckEvent])
      .subscribe(event => {
        this._emitReadinessRequest(event.id, event.gameSessionId);
      });

    this._eventService.on([MatchmakingRequestDetachedEvent])
      .subscribe(event => {
        this._closeSocket(event.id);
      });

    
  }

  public onApplicationBootstrap(): void  {
    this.server.use(async (socket, next) => {
      const tokenPayload = await this._tokenGenerator.checkToken(socket.handshake.query.token as string)
      socket.handshake.query.token = tokenPayload;
      next();
    })
  }
  
  public handleConnection(socket: Socket) {
    const { roomId } = socket.handshake.query.token as unknown as any;
    this._sockets.push(socket);
    socket.join(roomId);

    this._eventService.emit(new MatchmakingRequestConfirmationEvent({ id: roomId }));
  }

  public handleDisconnect(socket: Socket) {
    const { roomId } = socket.handshake.query.token as unknown as any;
    this._eventService.emit(new MatchmakingRequestDetachedEvent({ id: roomId }));
  }

  @SubscribeMessage('confirm-readiness')
  confirmReadiness(socket: Socket): void {
    const { roomId } = socket.handshake.query.token as unknown as any;

    if (socket.rooms[roomId]) {
      this._eventService.emit(new MatchmakingRequestConfirmationEvent({ id: roomId }));
    };
  }


  // emit 
  private _emitResolved(roomName: string, payload: string) {
    this.server.to(roomName).emit('matchmaking-resolved', payload);
  } 

  private _emitReadinessRequest(roomName: string, payload: string) {
    this.server.to(roomName).emit('readiness-request', payload);
  }

  private _closeSocket(roomId: string): void {
    // const socket = this.server.sockets.;
    // socket.disconnect(false);
  }
   
}