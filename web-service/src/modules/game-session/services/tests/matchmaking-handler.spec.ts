import { Test, TestingModule } from '@nestjs/testing';
import { Profile } from 'src/database/models/profile.model';
import { GamesType, MatchmakingConfig, MatchmakingHandler, MatchRequest } from '../matchmaking-handler';


class MatchRequestMock extends MatchRequest {
  constructor(owner, criteria) {
    super(owner, criteria);
  }
}

class ProfileMock {
  constructor() {}
}


describe('MatchmakingHandler', () => {
  let handler: MatchmakingHandler;

  // uuid generator mock
  const id = "faf308e6-450d-4ba9-90ee-6524f05d6548";
  const idGeneratorMock = () => id;

  // handler sample configuration
  const config: MatchmakingConfig = {
    numberOfRequiredRequests: 4,
    maxSearchingTime: 1000,
    gameType: GamesType.Quickmatch
  };

  // sample matchmaking requests
  const requests: MatchRequestMock[] = [
    new MatchRequestMock(new ProfileMock(), { numberOfRequiredRequests: 4, gameType: GamesType.Ranked }),
    new MatchRequestMock(new ProfileMock(), { numberOfRequiredRequests: 2, gameType: GamesType.Ranked }),
    new MatchRequestMock(new ProfileMock(), { numberOfRequiredRequests: 3, gameType: GamesType.Ranked }),
    new MatchRequestMock(new ProfileMock(), { numberOfRequiredRequests: 4, gameType: GamesType.Quickmatch }),
  ]
  
  beforeEach(() => {
    handler = new MatchmakingHandler(idGeneratorMock);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should have id equals to sample id for given id', () => {
    handler.initialize(config);
    expect(handler.id).toEqual(id);
  });

  it('should been initialized with cfg values for passed config', () => {
    handler.initialize(config);
    expect(handler['_requiredRequests']).toEqual(config.numberOfRequiredRequests);
    expect(handler['_maxSearchingTime']).toEqual(config.maxSearchingTime);
    expect(handler['_gameType']).toEqual(config.gameType);
  });

  it('should have one matched request for given requests', () => {
    handler.initialize(config);
    requests.forEach(req => handler.addRequest(req));
    expect(handler['_requests'].length).toEqual(1);

  });

});
