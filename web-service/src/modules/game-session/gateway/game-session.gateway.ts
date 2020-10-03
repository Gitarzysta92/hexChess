import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8988)
export class GameSessionGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('web socket');
    return 'Hello world!';
  }

  @SubscribeMessage('create')
  handleCreate(client: any, payload: any) {
    console.log('create');
    client.join('room');
  }

  @SubscribeMessage('leave')
  handleLeave(client: any) {
    console.log('leave');
    client.leave('room');
  }

  emitMessage(roomName: string, payload: string): void {
    console.log('emit', roomName);
    this.server.to(roomName).emit('message', payload);
  }
}
