import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from '../users/users.module';
import { MatchmakingController } from './controllers/matchmaking.controller';
import { GameSessionGateway } from './gateway/game-session.gateway';
import { MatchmakingService } from './services/matchmaking.service';

@Module({
  imports: [
    DatabaseModule,
    UsersModule
  ],
  controllers: [
    MatchmakingController
  ],
  providers: [
    MatchmakingService,
    GameSessionGateway
  ],
  exports: [
    MatchmakingService
  ]
})
export class GameSessionModule {}
