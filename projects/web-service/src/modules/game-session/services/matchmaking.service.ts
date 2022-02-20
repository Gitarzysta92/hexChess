import { Injectable } from '@nestjs/common';
import { EventService } from 'src/core/events/event.service';
import { GamesType, MatchmakingFailureEvent, MatchmakingSuccessEvent } from '../models/events';
import { MatchmakingFactory } from '../utlis/matchmaking.factory';
import { MatchmakingHandler } from './matchmaking-handler';
import { MatchmakingRequest } from './matchmaking-request';



@Injectable()
export class MatchmakingService {
  private _matchmakings: Array<MatchmakingHandler> = [];

  constructor(
    private readonly _matchmakingFactory: MatchmakingFactory,
    private readonly _eventService: EventService
  ) {
    this._eventService.on([MatchmakingSuccessEvent, MatchmakingFailureEvent])
      .subscribe(event => {
        this._removeMatchmakingRoom(event.id);
      })
  }

  public async findQuickmatch(userId: string, requiredPlayers?: number): Promise<string> {
    if (userId == null || requiredPlayers > 4) return;

    this._matchmakings.length = 0;

    const criteria = { players: requiredPlayers, gameType: GamesType.Quickmatch };
    const matchRequest = this._matchmakingFactory.createMatchRequest(userId, criteria);

    if (this._matchmakings.length > 0) {
      const quickmatch = this._matchmakings.find(room => room.register(matchRequest));
      return quickmatch.id;
    } else {
      const quickmatch = this._matchmakingFactory.createMatchmakingHandler(criteria);
      quickmatch.register(matchRequest);
      this._matchmakings.push(quickmatch);
      return quickmatch.id;
    }
  }


  private _removeMatchmakingRoom(room: string) {
    this._matchmakings = this._matchmakings.filter(r => r.id === room);
  }

}


// process.nextTick(() => this._fullfilmentCb(this));






