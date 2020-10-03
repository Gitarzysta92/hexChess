// import { throws } from 'assert';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
// import { is } from 'sequelize/types/lib/operators';
// import { ProfileDto } from 'src/modules/users/models/profileDto';
// import { v4 } from 'uuid';
// import { List } from 'utils';


// export enum GamesType {
//   Quickmatch,
//   Ranked,
// }

// export interface MatchmakingConfig {
//   numberOfRequiredRequests: 2 | 3 | 4;
//   maxSearchingTime: number;
//   gameType: GamesType;
// }

// export interface RequestsChange {
//   action: 'registered' | 'removed';
//   request: MatchRequest;
// }

// export class MatchmakingHandler {
//   public id: string;
//   public onRequestsChange: Subject<RequestsChange>;
//   public onTimeout: Subject<string>;

//   private _requests: List<MatchRequest>;
//   private _gameType: GamesType;
//   private _requiredRequests: number;
//   private _maxSearchingTime: number;

//   private _uuid: Function;

//   private _destroyed: Subject<any>;

//   constructor(private readonly uuid: Function) {
//     this._uuid = uuid;
//   }

//   public initialize(config: MatchmakingConfig): void {
//     this.id = this._uuid();
//     this._requiredRequests = config.numberOfRequiredRequests;
//     this._maxSearchingTime = config.maxSearchingTime;
//     this._gameType = config.gameType;
//     this._requests = new List<MatchRequest>({ size: this._requiredRequests });

//     this._onAllRequestsMatched();
//     this._onRequestRemoved();
//     this._startCountdown(() => this.destroy());
//   }

//   public destroy() {
//     this._requests.forEach(req => (req.setUnavailable()));
//     this._requests.clear();
//     this._
//   }

//   public addRequest(req: MatchRequest): boolean {
//     let isValid = false;
//     isValid = this._validateRequest(req);
//     isValid = this._validateCriteria(req);
//     if (isValid === false) return false;

//     return this._requests.add(req);
//   }

//   public removeRequest(req: MatchRequest): void {
//     const isValid = this._validateRequest(req);
//     if (isValid === false) return;

//     this._requests.remove(req);
//   }

//   private _validateCriteria(req: MatchRequest): boolean {
//     const { playersNumber, gameType } = req;
//     let isValid = true;

//     if (playersNumber !== this._requiredRequests || gameType !== this._gameType)
//       isValid = false;

//     return isValid;
//   }

//   private _validateRequest(req: MatchRequest): boolean {
//     const propNames = Object.keys(req);
//     const invalidProps = propNames.filter(key => req[key] == null);
//     return invalidProps.length === 0;
//   }

//   private _startCountdown(cb: Function): void {
//     setTimeout(() => cb(), this._maxSearchingTime);
//   }

//   private _onAllRequestsMatched(): void {
//     this._requests.listChanged
//       .pipe(takeUntil(this._destroyed))
//       .pipe() // if fullfilled
//       .subscribe(() => {
//         this._requests.forEach(req => (req.setAvailable()));
//       });
//   }

//   private _onRequestRemoved(): void {
//     this._requests.listChanged
//       .pipe(takeUntil(this._destroyed))
//       .pipe()
//       .subscribe()
//   }
// }

// export type RequestCriteria = Omit<MatchmakingConfig, 'maxSearchingTime'>;
// // unavaialable -> available -> confirmed -> start game


// export class MatchRequest {
//   public id: string;
//   public gameType: GamesType;
//   public playersNumber: number;

//   private _isConfirmed: boolean;

//   constructor(owner: ProfileDto, criteria: RequestCriteria) {
//     this.id = owner.id;
//     this.gameType = criteria.gameType;
//     this.playersNumber = criteria.numberOfRequiredRequests;
//   }
// }

// // criteria:
