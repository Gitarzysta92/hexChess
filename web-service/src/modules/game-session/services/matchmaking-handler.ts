import { Subject } from 'rxjs';
import { is } from 'sequelize/types/lib/operators';
import { ProfileDto } from 'src/modules/users/models/profileDto';
import * as uuid from 'uuid';


class List<T> {
  
  public get length()  { return this._list.length }
  private _list: T[] = [];

  private _size: number;

  constructor(settings) {
    this._size = settings.size;
  }

  public add(item: T) {
    const size = this._size;
    if (size != null && size <= this._list.length) return;
    return !!this._list.push(item);
  }


}




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

  private _requests: List<MatchRequest>;
  private _gameType: GamesType;
  private _requiredRequests: number;
  private _maxSearchingTime: number;

  private _uuid: Function;

  constructor(
    private readonly uuid: Function,
  ) {
    this._uuid = uuid;
    
  }

  public initialize(config: MatchmakingConfig): void {
    this.id = this._uuid();
    this._requiredRequests = config.numberOfRequiredRequests;
    this._maxSearchingTime = config.maxSearchingTime;
    this._gameType = config.gameType;
    this._requests = new List<MatchRequest>({ size: this._requiredRequests });

  }

  public addRequest(req: MatchRequest): boolean {
    // const isInvalid = !this._validRequest(req);
    // if (isInvalid) 
    const isFullfilsCriteria = this._validateCriteria(req);
    if (isFullfilsCriteria === false) return;

    return this._requests.add(req);
  }

  

  public removeRequest(req: MatchRequest): void {

  }


  private _validateCriteria(req: MatchRequest): boolean {
    const { playersNumber, gameType } = req;
    let isValid = true;

    if (
      playersNumber !== this._requiredRequests || 
      gameType !== this._gameType
    ) isValid = false;

    return isValid;
  }

  private _startCountdown(): void {

  }


}


export type RequestCriteria = Omit<MatchmakingConfig, "maxSearchingTime">;


export class MatchRequest {
  public gameType: GamesType;
  public playersNumber: number;

  private _isConfirmed: boolean;

  constructor(owner: ProfileDto, criteria: RequestCriteria) {
    this.gameType = criteria.gameType;
    this.playersNumber = criteria.numberOfRequiredRequests;
  }



}




// criteria: