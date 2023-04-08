import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AspectsModule } from 'src/aspects/events/aspects.module';
import { SystemConfiguration } from 'src/aspects/events/services/configuration/system-configuration.service';
import { Profile } from 'src/core/profiles/models/profile.entity';
import { Account } from 'src/core/identity/models/account.entity';
import { TokenGenerator } from 'src/shared/utils/token-generator/token-generator';
import { UtilityModule } from 'src/shared/utils/utility.module';
import { GameModule } from '../game/game.module';
import { ProfilesModule } from '../profiles/profiles.module';
import { MatchmakingController } from './controllers/matchmaking.controller';
import { RoomsController } from './controllers/rooms.controller';
import { MatchmakingQueue } from './core/matchmaking-queue';
import { MatchmakingGateway } from './gateways/matchmaking.gateway';
import { MatchmakingService } from './services/matchmaking/matchmaking.service';
import { RoomsService } from './services/rooms/rooms.service';
import { ArmiesModule } from '../armies/armies.module';


@Module({
  imports: [
    SequelizeModule.forFeature([Account, Profile]), 
    ProfilesModule, 
    AspectsModule, 
    UtilityModule,
    AspectsModule,
    GameModule,
    ArmiesModule
  ],
  controllers: [
    MatchmakingController,
    RoomsController
  ],
  providers: [
    MatchmakingService,
    RoomsService,
    MatchmakingGateway,
    MatchmakingQueue
  ],
  exports: [
    MatchmakingService
  ],
})
export class MatchmakingModule {
  constructor(
    private readonly _matchmakingGateway: MatchmakingGateway,
    private readonly _tokenGenerator: TokenGenerator,
    private readonly _systemConfiguration: SystemConfiguration
  ) {
    this._matchmakingGateway.listenForCompletedMatchmaking();
    this._matchmakingGateway.listenForPlayerLeaveMatchmakingQueue();
    this._matchmakingGateway.listenForRejectedMatchmaking();

    const secret = this._systemConfiguration.secret;
    this._tokenGenerator.setSecret(secret);
  }
}
