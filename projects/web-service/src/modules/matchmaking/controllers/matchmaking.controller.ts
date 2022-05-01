import { createParamDecorator, ExecutionContext, Controller, UseGuards, BadRequestException, Post, ConflictException, Body, Get } from "@nestjs/common";
import { SystemConfiguration } from "src/aspects/events/services/configuration/system-configuration.service";
import { ContextUser } from "src/extensions/decorators/context-user.decorator";

import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { GameService } from "src/modules/game/services/game/game.service";
import { TokenGenerator } from "src/utils/token-generator/token-generator";
import { MatchmakingService } from "../services/matchmaking/matchmaking.service";



@Controller('matchmaking')
export class MatchmakingController {
  constructor(
    private readonly _matchmakingService: MatchmakingService,
    private readonly _gameService: GameService,
    private readonly _systemConfiguration: SystemConfiguration,
    private readonly _tokenGenerator: TokenGenerator
  ) {}

  @UseGuards(JwtAuthGuard)
  //@Post('quickmatch/:rp?')  
  @Post('quickmatch')  
  async customQuickmatch(
    @ContextUser() user,
    @Body() payload
  ): Promise<string> {
    const MAX_PLAYERS = this._systemConfiguration.playersLimit;
    const MIN_PLAYERS = this._systemConfiguration.playersMinimum;

    const { requiredPlayers, selectedArmies } = payload;

    if (!isNaN(requiredPlayers) && requiredPlayers < MIN_PLAYERS) 
      throw new BadRequestException(`Required players number should be equal or above: ${MIN_PLAYERS}`);

    if (!isNaN(requiredPlayers) && requiredPlayers > MAX_PLAYERS) 
      throw new BadRequestException(`Required players number should be equal or below: ${MAX_PLAYERS}`);

    if (this._gameService.checkIfPlayerIsAlreadyInTheGame(user.id))
      throw new ConflictException('Player is already in the game');

    const result = await this._matchmakingService.findQuickmatch(user.profileId, requiredPlayers, selectedArmies);
    return await this._tokenGenerator.create(result);
  }



}