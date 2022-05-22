import { Controller, Get, UseGuards, Param, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { SystemConfiguration } from 'src/aspects/events/services/configuration/system-configuration.service';
import { TokenGenerator } from 'src/utils/token-generator/token-generator';
import { ContextUser, ContextUserData } from 'src/extensions/decorators/context-user.decorator';
import { GameService } from '../services/game/game.service';
import { GameSessionDto } from '../models/game-session.dto';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';


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