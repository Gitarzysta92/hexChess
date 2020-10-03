import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { MatchmakingService } from '../services/matchmaking.service';
import { ProfilesService } from 'src/modules/users/services/profiles.service';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GameSessionGateway } from '../gateway/game-session.gateway';

export const LocalUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

@Controller('start')
export class MatchmakingController {
  constructor(
    private readonly _profilesService: ProfilesService,
    private readonly _matchmakingService: MatchmakingService,
    private readonly _gameSessionGateway: GameSessionGateway
  ) {

    setInterval(() => {
      this._gameSessionGateway.emitMessage('room','sdasd');
    },3000);

    
  }

  @UseGuards(JwtAuthGuard)
  @Get('quickmatch')
  async getRoomId(@LocalUser() user) {
    const profile = await this._profilesService.getProfile(user.id);
    return await this._matchmakingService.createChallange(profile);
  }
}
