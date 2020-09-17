import { Subject } from 'rxjs';
import { ProfileDto } from 'src/modules/users/models/profileDto';
import * as uuid from 'uuid';


export enum GamesType {
  Quickmatch,
  Ranked,
}

export interface MatchmakingConfig {
  numberOfRequiredRequests: 2 | 3 | 4;
  maxSearchingTime: number;
  gameType: GamesType;
}


export interface RequestsChange {
  action: 'registered' | 'removed';
  request: MatchRequest;
}



export class MatchmakingHandler {
  public id: string;
  public onRequestsChange: Subject<RequestsChange>;
  public onTimeout: Subject<string>;

  private _requests: MatchRequest[];
  private _gameType: GamesType;
  private _requiredRequests: number;
  private _maxSearchingTime: number;

  private _uuid: Function;

  constructor(uuid: Function) {
    this._uuid = uuid;
    this._requests = [];
  }

  public initialize(config: MatchmakingConfig): void {
    this.id = this._uuid();
    this._requiredRequests = config.numberOfRequiredRequests;
    this._maxSearchingTime = config.maxSearchingTime;
    this._gameType = config.gameType;

  }

  public addRequest(req: MatchRequest): void {

  }

  

  public removeRequest(req: MatchRequest): void {

  }

  private _matchRequest(req: MatchRequest): void {

  }

  private _startCountdown(): void {

  }


}


export type RequestCriteria = Omit<MatchmakingConfig, "maxSearchingTime">;


export class MatchRequest {
  private _type: GamesType;
  private _playersNumber: 4;

  // 
  private _isConfirmed: boolean;

  constructor(owner: ProfileDto, criteria: RequestCriteria) {

  }



}




// criteria: