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
import { EventService } from 'src/aspects/events/services/events/event.service';
import { TokenGenerator } from 'src/utils/token-generator/token-generator';


@WebSocketGateway(3030, { namespace: 'game', cors: {
  origin: ["http://localhost:4200"],
  methods: ["GET", "POST"],
  credentials: false
} })
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
    this.server.to(roomId).emit('player-joined', '');
  }

  public handleDisconnect(socket: Socket) {
    const { roomId } = socket.handshake.query.token as unknown as any;
    this.server.to(roomId).emit('player-left', '');
  }

  @SubscribeMessage('next-round')
  confirmReadiness(socket: Socket): void {
    const { roomId } = socket.handshake.query.token as unknown as any;

    if (!socket.rooms[roomId])
      return;

    this.server.to(roomId).emit('next-round', '');
  }
   
}