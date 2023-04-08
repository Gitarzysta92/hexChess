import { Controller, Get, UseGuards, Param, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/identity/guards/jwt-auth.guard';
import { ContextUser } from 'src/shared/extensions/decorators/context-user.decorator';
import { GameService } from '../services/game/game.service';
import { GameSessionDto } from '../models/game-session.dto';
import { ContextUserData } from 'src/shared/extensions/api';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Game')
@Controller('game')
export class MatchmakingController {
  constructor(
    private readonly _gameService: GameService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/session/:id')  
  async getGameSession(
    @Param('id') gameSessionId: string,
    @ContextUser() user: ContextUserData
  ): Promise<GameSessionDto> {

    const session = await this._gameService.getGameSession(gameSessionId, user.profileId);

    if (!session) 
      throw new BadRequestException(`Session not found`);

    return session
  }

}