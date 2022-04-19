import { Controller, Get, UseGuards, Param, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { MatchmakingService } from '../services/matchmaking.service';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SystemConfiguration } from 'src/core/system-configuration.service';
import { TokenGenerator } from 'src/utils/token-generator/token-generator';

export const LocalUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

@Controller('start')
export class MatchmakingController {
  constructor(
    private readonly _matchmakingService: MatchmakingService,
    private readonly _systemConfiguration: SystemConfiguration,
    private readonly _tokenGenerator: TokenGenerator
  ) {}



  // here must validated if given player is already in the game. If yes, controller should return proper error code; 
  @UseGuards(JwtAuthGuard)
  @Get('quickmatch/:rp?')  
  async customQuickmatch(
    @Param('rp') requiredPlayers: number,
    @LocalUser() user
  ): Promise<string> {
    const MAX_PLAYERS = this._systemConfiguration.playersLimit;
    const MIN_PLAYERS = this._systemConfiguration.playersMinimum;

    if (!isNaN(requiredPlayers) && requiredPlayers > MAX_PLAYERS) 
      throw new BadRequestException('Post not found');

    const playersNumber = requiredPlayers || MIN_PLAYERS;
    const quickmatchId = await this._matchmakingService.findQuickmatch(user.id, playersNumber);

    return await this._tokenGenerator.create({ roomId: quickmatchId });
  }
}