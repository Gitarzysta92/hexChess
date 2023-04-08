import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/identity/guards/jwt-auth.guard';
import { PlayerProfile } from '../models/player-profile';
import { RoomsService } from '../services/rooms/rooms.service';

@ApiOAuth2([], 'CustomOAuth')
@ApiTags('Matchmaking')
@Controller('rooms')
export class RoomsController {

  constructor(
    private readonly _roomsService: RoomsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:roomId/players')  
  async getPlayersByRoomId(
    @Param('roomId') roomId: string
  ): Promise<PlayerProfile[]> {
    return await this._roomsService.getPlayersFromRoom(roomId);
  }

}