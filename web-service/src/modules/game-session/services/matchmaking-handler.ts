
import { delay, filter } from 'rxjs/operators';
import { EventEmitter } from 'src/core/events/event-emitter';
import { List, StateContainer } from 'utils';
import { GamesType, MatchmakingFailureEvent, MatchmakingSuccessEvent } from '../models/events';
import { MatchmakingConfig, MatchmakingRequest } from './matchmaking-request';


export enum MatchmakingState {
  Success,
  Failure,
  Pending
};

const SUCCESS = MatchmakingState.Success;
const FAILURE = MatchmakingState.Failure;
const PENDING = MatchmakingState.Pending;


export class MatchmakingHandler extends EventEmitter<MatchmakingSuccessEvent | MatchmakingFailureEvent>  {
  public get id() { return this._id };
  public get state() { return this._state.value; }

  private _id: string;
  private _state: StateContainer<MatchmakingState>

  private _requests: List<MatchmakingRequest>;
  private _gameType: GamesType;
  private _requiredRequests: number;
  private _maxSearchingTime: number;

  private _uuid: Function;

  constructor(private readonly uuid: Function) {
    super();
    this._uuid = uuid;
    this._state = new StateContainer(PENDING, [ SUCCESS, FAILURE, PENDING ]);
  }

  public initialize(config: MatchmakingConfig): void {
    this._id = this._uuid();
    this._requiredRequests = config.players;
    this._maxSearchingTime = config.searchingTime;
    this._gameType = config.gameType;
    this._requests = new List<MatchmakingRequest>({ size: this._requiredRequests });

    this._state.changed.subscribe(state => {
      switch(state) {
        case SUCCESS: {     
          this._requests.forEach(req => req.setResolved());
          this._emitSuccess();
          break;
        }
        case FAILURE: {
          this._emitFailure();
          this._requests.forEach(req => req.setRejected());
          break;
        }
        case PENDING: {
          this._requests.forEach(req => req.readinessCheck())
          break;
        }
      }
    });

    this._setSuccessOnAllRequestsMatched();
    this._setFailureOnTimeout();
  }

  


  private _emitSuccess(): void {
    this.emit(new MatchmakingSuccessEvent({
      id: this.id,
      gameType: this._gameType,
      players: this._requests.toArray().map(r => r.profileId),
    }));
  }

  private _emitFailure(): void {
    this.emit(new MatchmakingFailureEvent({
      id: this.id,
      players: this._requests.toArray().map(r => r.profileId),
    }));
  }

  public register(req: MatchmakingRequest): boolean {
    let isValid = false;
    isValid = this._validateRequest(req);
    isValid = this._validateCriteria(req);
    if (!isValid) return false;

    req.destroyed(() => this.remove(req));
    return this._requests.add(req);
  }

  public remove(req: MatchmakingRequest): void {
    const isValid = this._validateRequest(req);
    if (isValid === false) return;

    this._requests.remove(req);
  }

  private _validateCriteria(req: MatchmakingRequest): boolean {
    const { playersNumber, gameType } = req;
    let isValid = true;

    if (playersNumber !== this._requiredRequests || gameType !== this._gameType)
      isValid = false;

    return isValid;
  }

  private _validateRequest(req: MatchmakingRequest): boolean {
    const propNames = Object.keys(req);
    const invalidProps = propNames.filter(key => req[key] == null);
    return invalidProps.length === 0;
  }

  private _setFailureOnTimeout(): void {
    setTimeout(() => {
      this._state.set(FAILURE);
    }, this._maxSearchingTime);
  }

  private _setSuccessOnAllRequestsMatched(): void {
    this._requests.listChanged
      .pipe(filter(value => value === this._requiredRequests))
      .pipe(delay(2000))
      .subscribe(() => {
        const requests = this._requests.toArray();
        const notConfirmed = requests.filter(req => !req.isConfirmed());

        if (notConfirmed.length > 0) {
          notConfirmed.forEach(req =>  this.remove(req));

          // TODO: Ten set state tutaj powinien dawać możliwość 
          // wyemitowania eventu zmiany statusu nawet jeżeli zmiana zachodzi z tego samego na ten sam
          // PENDING => PENDING
          //this._state.set(PENDING, { force: true });
          this._state.set(PENDING);
        } else {
          this._state.set(SUCCESS);
        }

      });
  }
}
