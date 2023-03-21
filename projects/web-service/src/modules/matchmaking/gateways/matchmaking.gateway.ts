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
import { MatchmakingCompletedEvent, MatchmakingRejectedEvent, PlayerLeftMatchmakingRoomEvent } from '../events/events';
import { MatchmakingService } from '../services/matchmaking/matchmaking.service';
import { HashGeneratorService } from 'src/utils/hash-generator/hash-generator/hash-generator.service';
import { SystemConfiguration } from 'src/aspects/events/services/configuration/system-configuration.service';


@WebSocketGateway(3030, { namespace: 'matchmaking', cors: {
  origin: ["http://localhost:4200"],
  methods: ["GET", "POST"],
  credentials: false
} })
export class MatchmakingGateway implements OnGatewayConnection, OnGatewayDisconnect, OnApplicationBootstrap {

  @WebSocketServer()
  server: Server;

  public onRoomJoined: Subject<string>;

  constructor(
    private readonly _matchmakingService: MatchmakingService,
    private readonly _eventsService: EventService,
    private readonly _tokenGenerator: TokenGenerator,
    private readonly _hashGenerator: HashGeneratorService,
    private readonly _systemConfiguration: SystemConfiguration
  ) { }

  listenForPlayerLeaveMatchmakingQueue(): void {
    this._eventsService.on([PlayerLeftMatchmakingRoomEvent])
      .subscribe((event: PlayerLeftMatchmakingRoomEvent) => {
        this.server.to(event.roomId).emit('players-updated', event);
      });
  }

  listenForCompletedMatchmaking(): void {
    this._eventsService.on([MatchmakingCompletedEvent])
      .subscribe((event: MatchmakingCompletedEvent) => {
        const matchmakingHash = this._hashGenerator.createMd5(event,  this._systemConfiguration.secret);
        this.server.to(event.roomId).emit('matchmaking-completed', { token: matchmakingHash });
      });
  }

  listenForRejectedMatchmaking(): void {
    this._eventsService.on([MatchmakingRejectedEvent])
      .subscribe((event: MatchmakingRejectedEvent) => {
        this.server.to(event.roomId).emit('matchmaking-rejected');
      });
  }

  @SubscribeMessage('confirm-readiness')
  confirmReadiness(socket: Socket): void {
    const { roomId, playerId } = socket.handshake.query.token as unknown as any;

    if (!socket.rooms.has(roomId))
      return;

    this._matchmakingService.confirmMatchmakingJoin(roomId, playerId);
  }

  handleConnection(socket: Socket) {
    // here should be additional validation, to ensure that token is not
    // used by someone unauthenticated.
    const { roomId } = socket.handshake.query.token as unknown as any;

    const isRoomExists = this._matchmakingService.isRoomExists(roomId);
    
    if(!isRoomExists)
      socket.disconnect();

    socket.join(roomId);
    const players = this._matchmakingService.getPlayersInTheRoom(roomId);
    this.server.to(roomId).emit('players-updated', { players });
  }

  handleDisconnect(socket: Socket) {
    const { roomId, playerId } = socket.handshake.query.token as unknown as any;
    this._matchmakingService.leaveMatchmaking(roomId, playerId);
    const players = this._matchmakingService.getPlayersInTheRoom(roomId);
    this.server.to(roomId).emit('players-updated', { players });
  }


  onApplicationBootstrap(): void  {
    this.server.use(async (socket, next) => {
      const tokenPayload = await this._tokenGenerator.checkToken(socket.handshake.query.token as string)
      socket.handshake.query.token = tokenPayload;
      next();
    })
  }
}