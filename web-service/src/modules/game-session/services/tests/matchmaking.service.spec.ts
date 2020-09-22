import { Test, TestingModule } from '@nestjs/testing';
import { MatchmakingController } from '../../controllers/matchmaking.controller';
import { GameSessionGateway } from '../../gateway/game-session.gateway';
import { MatchmakingService } from '../matchmaking.service';

describe('MatchMakingService', () => {
  let matchmaking: MatchmakingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchmakingService, GameSessionGateway],
    }).compile();

    matchmaking = module.get<MatchmakingService>(MatchmakingService);
  });

  it('should be defined', () => {
    expect(matchmaking).toBeDefined();
  });
});
