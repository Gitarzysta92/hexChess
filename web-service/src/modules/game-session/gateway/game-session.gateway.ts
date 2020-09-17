import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
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


  emitMessage(roomName: string, payload: string): void {
    console.log('emit', roomName);
    this.server.emit('players-matched', payload);
    this.server.emit('message', payload);
    this.server.to(roomName).emit('message', payload);
  }

}