import { Observable } from "rxjs";
import { EventEmitter } from "src/core/events/event-emitter";
import { StateContainer } from "utils";
import { GamesType, MatchmakingRequestReadinessCheckEvent, MatchmakingRequestRejectedEvent, MatchmakingRequestResolvedEvent } from "../models/events";


export interface MatchmakingConfig {
  players: number;
  searchingTime: number;
  gameType: GamesType;
}


export type RequestCriteria = Omit<MatchmakingConfig, 'searchingTime'>;


export enum MatchmakingRequestState {
  Confirmation,
  Confirmed,
  Resolved,
  Rejected
} 

const CONFIRMATION = MatchmakingRequestState.Confirmation;
const CONFIRMED = MatchmakingRequestState.Confirmed;
const RESOLVED = MatchmakingRequestState.Resolved;
const REJECTED = MatchmakingRequestState.Resolved;




export class MatchmakingRequest extends EventEmitter<MatchmakingRequestResolvedEvent | MatchmakingRequestReadinessCheckEvent | MatchmakingRequestRejectedEvent > {
  public id: string;
  public state: MatchmakingRequestState;
  public stateChanged: Observable<MatchmakingRequestState>;
  public gameType: GamesType;
  public playersNumber: number;
  public profileId: string;

  private _state: StateContainer<MatchmakingRequestState>

  constructor(userId: string, criteria: RequestCriteria, private readonly uuid: Function) {
    super();
    this.id = uuid();
    this.profileId = userId;
    this.gameType = criteria.gameType;
    this.playersNumber = criteria.players;

    this._state = new StateContainer(CONFIRMATION, [CONFIRMATION, CONFIRMED, RESOLVED, REJECTED ]);
    this._emitReadinessCheck();

    this._state.changed.subscribe(state => {
      if (state === RESOLVED) this._emitSuccess();
      if (state === REJECTED) {
        this._emitRejected();
        this.destroy();
      };
      if (state === CONFIRMATION) this._emitReadinessCheck();
    });
  }

  public setResolved(): void {
    this._state.set(RESOLVED);
  }

  public setRejected(): void {
    this._state.set(REJECTED);
  }

  public setConfirmed(): void {
    this._state.set(CONFIRMED);
  }

  public isConfirmed(): boolean {
    return this._state.value === CONFIRMED;
  }

  public readinessCheck(): void {
    this._state.set(CONFIRMATION);
  }

  private _emitSuccess(): void {
    this.emit(new MatchmakingRequestResolvedEvent({ id: this.profileId }));
  }

  private _emitRejected(): void {
    this.emit(new MatchmakingRequestRejectedEvent({ id: this.profileId }));
  }

  private _emitReadinessCheck(): void {
    this.emit(new MatchmakingRequestReadinessCheckEvent({ id: this.profileId }));
  }
}