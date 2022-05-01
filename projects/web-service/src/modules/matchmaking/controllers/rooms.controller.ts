import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { PlayerDto } from '../models/player';
import { RoomsService } from '../services/rooms/rooms.service';

@Controller('rooms')
export class RoomsController {

  constructor(
    private readonly _roomsService: RoomsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:roomId/players')  
  async getPlayersByRoomId(@Param('roomId') roomId): Promise<PlayerDto[]> {
    return await this._roomsService.getPlayersFromRoom(roomId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/players')  
  async getPlayersByIds(@Query() query): Promise<PlayerDto[]> {
    const playersIds: string[] = Object.values(query);

    if (!playersIds)
      return;

    return await this._roomsService.getPlayersByIds(playersIds);
  }
}
