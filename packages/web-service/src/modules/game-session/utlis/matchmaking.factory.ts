import { Injectable } from "@nestjs/common";
import { GameSessionGateway } from "../gateway/game-session.gateway";
import { MatchmakingHandler } from "../services/matchmaking-handler";
import { v4 } from 'uuid';
import { EventService } from "src/core/events/event.service";
import { MatchmakingRequestConfirmationEvent, MatchmakingRequestDetachedEvent, GamesType } from "../models/events";
import { filter } from "rxjs/operators";
import { MatchmakingConfig, MatchmakingRequest, RequestCriteria } from "../services/matchmaking-request";


@Injectable()
export class MatchmakingFactory {

  private _defaultCfg: MatchmakingConfig

  constructor(
    private readonly _eventService: EventService
  ) {
    this._defaultCfg = {
      players: 2,
      searchingTime: 1000 * 60,
      gameType: GamesType.Quickmatch
    }
  }

  createMatchRequest(userId: string, criteria): MatchmakingRequest {
    const request = new MatchmakingRequest(userId, criteria, v4);

    const confgirmation = this._eventService.on([MatchmakingRequestConfirmationEvent])
      .pipe(filter(event => event.requestId === request.id))
      .subscribe(() => request.setConfirmed());

    const detach = this._eventService.on([MatchmakingRequestDetachedEvent])
      .pipe(filter(event => event.requestId === request.id))
      .subscribe(() => request.destroy());

    request.destroyed(() => {
      confgirmation.unsubscribe();
      detach.unsubscribe();
    });

    return request;
  }

  createMatchmakingHandler(config: RequestCriteria): MatchmakingHandler {
    const matchmaking = new MatchmakingHandler(v4);
    matchmaking.initialize(Object.assign(this._defaultCfg, config));
    return matchmaking;
  }

}
