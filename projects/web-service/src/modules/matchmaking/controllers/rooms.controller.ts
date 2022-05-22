import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { PlayerProfile } from '../models/player-profile';
import { RoomsService } from '../services/rooms/rooms.service';

@Controller('rooms')
export class RoomsController {

  constructor(
    private readonly _roomsService: RoomsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:roomId/players')  
  async getPlayersByRoomId(@Param('roomId') roomId): Promise<PlayerProfile[]> {
    return await this._roomsService.getPlayersFromRoom(roomId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/players')  
  async getPlayersByIds(@Query() query): Promise<PlayerProfile[]> {
    const playersIds: string[] = Object.values(query);

    if (!playersIds)
      return;

    return await this._roomsService.getPlayersByIds(playersIds);
  }
}
