import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'hexchess-database';
import { CoreModule } from 'src/core/core.module';
import { SystemConfiguration } from 'src/core/system-configuration.service';

import { TokenGenerator } from 'src/utils/token-generator/token-generator';
import { UtilityModule } from 'src/utils/utility.module';
import { UsersModule } from '../users/users.module';
import { MatchmakingController } from './controllers/matchmaking.controller';
import { GameSessionGateway } from './gateway/game-session.gateway';
import { MatchmakingService } from './services/matchmaking.service';
import { MatchmakingFactory } from './utlis/matchmaking.factory';

@Module({
  imports: [
    SequelizeModule.forFeature([User]), 
    UsersModule, 
    CoreModule, 
    UtilityModule
  ],
  controllers: [
    MatchmakingController
  ],
  providers: [
    MatchmakingService, 
    GameSessionGateway, 
    MatchmakingFactory
  ],
  exports: [
    MatchmakingService
  ],
})
export class GameSessionModule {
  constructor(
    private readonly _gameSessionGateway: GameSessionGateway,
    private readonly _tokenGenerator: TokenGenerator,
    private readonly _systemConfiguration: SystemConfiguration
  ) {
    this._gameSessionGateway.initialize();

    const secret = this._systemConfiguration.secret;
    this._tokenGenerator.setSecret(secret);
  }
}
