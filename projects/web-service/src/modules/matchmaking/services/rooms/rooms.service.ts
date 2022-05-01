import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { Profile } from 'src/db-models/profile';
import { MatchmakingQueue } from '../../core/matchmaking-queue';
import { PlayerDto } from '../../models/player';

@Injectable()
export class RoomsService {


  constructor(
    @InjectModel(Profile)
    private _profile: typeof Profile,
    private readonly _matchmakingQueue: MatchmakingQueue,
  ) { }

  async getPlayersFromRoom(roomId: string): Promise<PlayerDto[]> {
    const players = this._matchmakingQueue.getPlayers(roomId);

    const result = await this._profile.findAll({
      where: {
        id: {
          [Op.in]: players.map(p => p.id)
        }
      },
    });
    return result as unknown as PlayerDto[];
  }

  async getPlayersByIds(playersIds: string[]): Promise<PlayerDto[]>  {
    const result = await this._profile.findAll({
      where: {
        id: {
          [Op.in]: playersIds
        }
      },
    });
    return result as unknown as PlayerDto[];
  }

}
