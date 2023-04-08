import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { Profile } from 'src/core/profiles/models/profile.entity';
import { MatchmakingQueue } from '../../core/matchmaking-queue';
import { PlayerProfile } from '../../models/player-profile';

@Injectable()
export class RoomsService {

  constructor(
    @InjectModel(Profile)
    private _profile: typeof Profile,
    private readonly _matchmakingQueue: MatchmakingQueue,
  ) { }

  async getPlayersFromRoom(roomId: string): Promise<PlayerProfile[]> {
    const players = this._matchmakingQueue.getPlayers(roomId);

    const result = await this._profile.findAll({
      where: {
        id: {
          [Op.in]: players.map(p => p.profileId)
        }
      },
    });
    return result as unknown as PlayerProfile[];
  }

}
