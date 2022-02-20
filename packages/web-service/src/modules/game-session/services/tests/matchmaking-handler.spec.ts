import { Test, TestingModule } from '@nestjs/testing';
import { Profile } from 'src/database/models/profile.model';
import { GamesType, MatchmakingConfig, MatchmakingHandler, MatchRequest } from '../matchmaking-handler';
import { v4 } from 'uuid';
import { ProfileDto } from 'src/modules/users/models/profileDto';

class MatchRequestMock extends MatchRequest {
  constructor(owner, criteria) {
    super(owner, criteria);
  }
}

class ProfileMock  {
  id: string;
  constructor() {
    this.id = v4();
  }
}

jest.useFakeTimers();

describe('MatchmakingHandler', () => {
  let handler: MatchmakingHandler;

  //#region test setup

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
  const requests: MatchRequestMock[] = generateMatchRequests([
    [2, GamesType.Ranked], [3, GamesType.Ranked], [4, GamesType.Ranked], [4, GamesType.Quickmatch]  
  ])
  
  beforeEach(() => {
    handler = new MatchmakingHandler(idGeneratorMock);
    handler.initialize(config);
  });

  //#endregion  

  //#region initialization

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should have id equals to sample id for given id', () => {
    expect(handler.id).toEqual(id);
  });

  it('should been initialized with proper values for passed config', () => {
    expect(handler['_requiredRequests']).toEqual(config.numberOfRequiredRequests);
    expect(handler['_maxSearchingTime']).toEqual(config.maxSearchingTime);
    expect(handler['_gameType']).toEqual(config.gameType);
  });

  //#endregion

  //#region matchRequest management 

  it('should return false for not matched request ', () => {
    const spy = jest.spyOn(handler, 'addRequest');
    const req = new MatchRequestMock(new ProfileMock(), {
      numberOfRequiredRequests: 2, gameType: GamesType.Ranked
    })
    handler.addRequest(req);
    expect(spy).toHaveReturnedWith(false);
  });

  it('should return true for matched request ', () => {
    const spy = jest.spyOn(handler, 'addRequest');
    const req = new MatchRequestMock(new ProfileMock(), {
      numberOfRequiredRequests: 4, gameType: GamesType.Quickmatch
    });
    handler.addRequest(req);
    expect(spy).toHaveReturnedWith(true);
  });


  it('should add one matchRequest for requests set with one matched', () => {
    requests.forEach(req => handler.addRequest(req));
    expect(handler['_requests'].length).toEqual(1);
  });


  it('should add four matchRequests for incoming excess requests that all matched', () => {
    const requests = generateMatchRequests([
      [4, GamesType.Quickmatch], [4, GamesType.Quickmatch], [4, GamesType.Quickmatch], [4, GamesType.Quickmatch],[4, GamesType.Quickmatch]  
    ])
    requests.forEach(req => handler.addRequest(req));
    expect(handler['_requests'].length).toEqual(4);    
  });


  it('should remove given matchRequest', () => {
    const requests = generateMatchRequests([
      [4, GamesType.Quickmatch], [4, GamesType.Quickmatch]  
    ]);
    const result = [...requests];
    const reqToRemove = result.shift();

    requests.forEach(req => handler.addRequest(req));
    expect(handler['_requests'].length).toEqual(requests.length);
    
    handler.removeRequest(reqToRemove);
    expect(handler['_requests'].length).toEqual(result.length);
    expect(handler['_requests'].toArray()).toEqual(          
      expect.arrayContaining([     
        expect.objectContaining(result[0])
      ])
    )
  });

  
  it('should return true for valid matchRequest', () => {
    const spy = jest.spyOn<any, any>(handler, '_validateRequest');
    const req = new MatchRequestMock(new ProfileMock(), {
      numberOfRequiredRequests: 4, gameType: GamesType.Quickmatch
    });
    handler['_validateRequest'](req);
    expect(spy).toHaveReturnedWith(true);       
  });


  it('should return false for invalid matchRequest', () => {
    const spy = jest.spyOn<any, any>(handler, '_validateRequest');
    const req = new MatchRequestMock({}, {
      numberOfRequiredRequests: null, gameType: GamesType.Quickmatch
    });
    handler['_validateRequest'](req);
    expect(spy).toHaveReturnedWith(false);       
  });

  //#endregion
  

  //#region handler expiration management
  it('should execute callback on countdown finished', () => {
    const callback = jest.fn();
    const expirationTime = handler['_maxSearchingTime'];

    handler['_startCountdown'](callback);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(expirationTime);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
  //#endregion
  



});




// helpers


function generateMatchRequests(requestsSetup: [number, number][]) {
  return requestsSetup.map(req => {
    return new MatchRequestMock(new ProfileMock(), { numberOfRequiredRequests: req[0], gameType: req[1] })
  });
}
