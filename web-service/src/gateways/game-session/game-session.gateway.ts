import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway(8988)
export class GameSessionGateway {

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('web socket');
    return 'Hello world!';
  }

}
