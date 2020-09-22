import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/database/models/user.model';
import { ProfileDto } from 'src/modules/users/models/profileDto';
import { GameSessionGateway } from '../gateway/game-session.gateway';

@Injectable()
export class MatchmakingService {
  private _queue: Array<Challenge> = [];

  constructor(private _gameSessionGateway: GameSessionGateway) {}

  public async createChallange(profile: ProfileDto): Promise<string> {
    if (this._queue.length === 0) {
      const challenge = new Challenge(profile, challange => {
        this._emitChallangeStart(challange);
        this._removeChallangeFromQueue(challange);
      });
      challenge.addPlayer(profile);
      this._queue.push(challenge);
      return challenge.token;
    }

    const challange = this._queue.find(c => c.addPlayer(profile));
    return challange.token;
  }

  private _removeChallangeFromQueue(c: Challenge) {
    this._queue = this._queue.filter(challenge => challenge.token != c.token);
  }

  private _emitChallangeStart(c: Challenge): void {
    setTimeout(() => {
      this._gameSessionGateway.emitMessage(c.token, c.token);
    }, 5000);
  }
}

class Challenge {
  public token: string;

  private _requiredPlayers: number;
  private _players: Array<ProfileDto> = [];
  private _fullfilmentCb: Function;

  constructor(profile: ProfileDto, fullfilmentCb: Function) {
    this._requiredPlayers = 2;
    this.addPlayer(profile);
    this._fullfilmentCb = fullfilmentCb;
    this.token = 'asd';
  }

  public addPlayer(profile: ProfileDto): boolean {
    if (this._players.length === this._requiredPlayers) return false;

    this._players.push(profile);
    if (this._players.length === this._requiredPlayers) {
      process.nextTick(() => this._fullfilmentCb(this));
    }

    return true;
  }
}
