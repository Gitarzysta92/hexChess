import { Controller, Get, UseGuards, Param, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { SystemConfiguration } from 'src/aspects/events/services/configuration/system-configuration.service';
import { TokenGenerator } from 'src/utils/token-generator/token-generator';


@Controller('start')
export class MatchmakingController {
  constructor(
    private readonly _systemConfiguration: SystemConfiguration,
    private readonly _tokenGenerator: TokenGenerator
  ) {}

  // @UseGuards(JwtAuthGuard)
  // @Get('game/:token?')  
  // async customQuickmatch(
  //   @Param('token') gameToken: string,
  //   @LocalUser() user
  // ): Promise<string> {

  //   if (!isNaN(requiredPlayers) && requiredPlayers > MAX_PLAYERS) 
  //     throw new BadRequestException('Post not found');

  //   const playersNumber = requiredPlayers || MIN_PLAYERS;
  //   const quickmatchId = await this._matchmakingService.findQuickmatch(user.id, playersNumber);

  //   return await this._tokenGenerator.create({ roomId: quickmatchId });
  // }

}