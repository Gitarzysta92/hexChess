import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AspectsModule } from 'src/aspects/events/aspects.module';
import { SystemConfiguration } from 'src/aspects/events/services/configuration/system-configuration.service';
import { Account } from 'src/core/identity/models/account.entity';

import { TokenGenerator } from 'src/shared/utils/token-generator/token-generator';
import { UtilityModule } from 'src/shared/utils/utility.module';
import { ProfilesModule } from '../profiles/profiles.module';
import { MatchmakingController } from './controllers/game.controller';
import { GameSessionsList, HexGameService } from './core/game-sessions-list';
import { GameStateManager } from './core/game-state-manager';
import { GameSessionGateway } from './gateway/game-session.gateway';
import { GameService } from './services/game/game.service';


@Module({
  imports: [
    SequelizeModule.forFeature([Account]), 
    ProfilesModule, 
    AspectsModule, 
    UtilityModule
  ],
  controllers: [
    MatchmakingController
  ],
  providers: [
    GameSessionGateway,
    GameService,
    GameStateManager,
    GameSessionsList,
    HexGameService
  ],
  exports: [
    GameService
  ],
})
export class GameModule {
  constructor(
    private readonly _gameSessionGateway: GameSessionGateway,
    private readonly _tokenGenerator: TokenGenerator,
    private readonly _systemConfiguration: SystemConfiguration
  ) {
    //this._gameSessionGateway.initialize();

    const secret = this._systemConfiguration.secret;
    this._tokenGenerator.setSecret(secret);
  }
}
