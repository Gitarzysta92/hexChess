import { IPlayerArmyAssignment } from 'src/core/game/models/player-army-assignment';
import { v4 as uuid } from 'uuid';
import { GameType, MAX_SEARCHING_TIME, MAX_WAITING_TIME_FOR_PLAYER_READINESS, READINESS_PROBE_INTERVAL } from "../constants/game-types";
import { MatchmakingRequest } from "./matchmaking-request";

export interface MatchmakingPlayer extends IPlayerArmyAssignment {
  isConfirmed: boolean;
  timeout: number;
  armyId: string;
}

export class MatchmakingResult {
  roomId: string;
  requiredPlayers: number;
  playerId: string;
  choosenArmy: string;
  timestamp: number;
};

export class MatchmakingRoom {
  id: string;
  gameType: GameType;
  requiredPlayers: number;
  players: MatchmakingPlayer[] = [];
  creationDate: Date = new Date();

  get isCompleted() { return this.players.filter(p => p.isConfirmed).length === this.requiredPlayers };

  private _timeout: number = Date.now() + MAX_SEARCHING_TIME;
  private _playerTimeoutCb: (timedPlayer: MatchmakingPlayer, roomdId: string, players: MatchmakingPlayer[]) => void;
  private _roomTimeoutCb: (timedRoom: MatchmakingRoom) => void;
  private _interval: NodeJS.Timer;

  constructor() { }

  join(matchRequest: MatchmakingRequest): MatchmakingResult | void {
    const notMatched = !this._checkCriteria(matchRequest);
    if(notMatched)
      return;

    const choosenArmy = matchRequest.selectedArmiesIds.find(id => 
      !this.players.map(p => p.armyId).includes(id))

    this.players.push({ 
      profileId: matchRequest.profileId,
      isConfirmed: false,
      timeout: Date.now() + MAX_WAITING_TIME_FOR_PLAYER_READINESS,
      armyId: choosenArmy
    });

    return {
      roomId: this.id,
      playerId: matchRequest.profileId,
      choosenArmy: choosenArmy,
      requiredPlayers: this.requiredPlayers,
      timestamp: Date.now()
    }
  }

  confirm(playerId: string): boolean {
    const player = this.players.find(p => p.profileId === playerId);
    return player.isConfirmed = true;
  }

  initialize(request: MatchmakingRequest): void {
    this.id = uuid();
    this.gameType = request.gameType;
    this.requiredPlayers = request.playersNumber;
    this._runTimeoutChecking();
  }

  removePlayer(playerId: string): void {
    this.players = this.players.filter(p => p.profileId !== playerId);
  }

  delete(): void {
    this._roomTimeoutCb(this);
    clearInterval(this._interval);
  }

  onPlayerTimedOut(cb: (timedPlayer: MatchmakingPlayer, roomdId: string, players: MatchmakingPlayer[]) => void) {
    this._playerTimeoutCb = cb;
  }

  onRoomTimedOut(cb: (timedRoom: MatchmakingRoom) => void) {
    this._roomTimeoutCb = cb;
  }

  private _checkCriteria(matchRequest: MatchmakingRequest): boolean {
    const playerSelectedRandomArmy = matchRequest.selectedArmiesIds.length === 0;
    const choosenArmyIsNotAlreadySelected = this.players.every(p => matchRequest.selectedArmiesIds.some(id => id !== p.armyId));

    return matchRequest.gameType === this.gameType && 
      matchRequest.playersNumber === this.requiredPlayers &&
      this.players.length < this.requiredPlayers &&
      this.isCompleted === false &&
      (playerSelectedRandomArmy || choosenArmyIsNotAlreadySelected)
  }

  private _runTimeoutChecking(): void {
    this._interval = setInterval(() => {
      const timestamp = Date.now();
      this._checkPlayersTimeout(timestamp);
      this._checkMatchmakingTimeout(timestamp);
    }, READINESS_PROBE_INTERVAL);
  }

  private _checkPlayersTimeout(timestamp: number): void {
    const players = this.players.filter(p => !p.isConfirmed && p.timeout < timestamp);
    players.forEach(p => {
      this.removePlayer(p.profileId);
      this._playerTimeoutCb(p, this.id, this.players);
    });
  }

  private _checkMatchmakingTimeout(timestamp: number): void {
    if (this._timeout < timestamp) {
      this.delete();
    }
  }

}