import { Controller, UseGuards, BadRequestException, Post, ConflictException, Body } from "@nestjs/common";
import { SystemConfiguration } from "src/aspects/events/services/configuration/system-configuration.service";
import { ContextUser } from "src/shared/extensions/decorators/context-user.decorator";
import { JwtAuthGuard } from "src/core/identity/guards/jwt-auth.guard";
import { GameService } from "src/core/game/services/game/game.service";
import { TokenGenerator } from "src/shared/utils/token-generator/token-generator";
import { MatchmakingService } from "../services/matchmaking/matchmaking.service";
import { ApiOAuth2, ApiTags } from "@nestjs/swagger";
import { MatchmakingRequestDto } from "../models/matchmaking-request.dto";
import { ArmiesService } from "src/core/armies/services/armies.service";
import { ModelValidationPipe } from "src/shared/utils/api";

@ApiOAuth2([], 'CustomOAuth')
@ApiTags('Matchmaking')
@Controller('matchmaking')
export class MatchmakingController {
  constructor(
    private readonly _matchmakingService: MatchmakingService,
    private readonly _gameService: GameService,
    private readonly _systemConfiguration: SystemConfiguration,
    private readonly _tokenGenerator: TokenGenerator,
    private readonly _armiesService: ArmiesService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('quickmatch')  
  async customQuickmatch(
    @ContextUser() user,
    @Body(new ModelValidationPipe()) payload: MatchmakingRequestDto
  ): Promise<string> {
    const MAX_PLAYERS = this._systemConfiguration.playersLimit;
    const MIN_PLAYERS = this._systemConfiguration.playersMinimum;

    const { requiredPlayers } = payload;

    if (!isNaN(requiredPlayers) && requiredPlayers < MIN_PLAYERS) 
      throw new BadRequestException(`Required players number should be equal or above: ${MIN_PLAYERS}`);

    if (!isNaN(requiredPlayers) && requiredPlayers > MAX_PLAYERS) 
      throw new BadRequestException(`Required players number should be equal or below: ${MAX_PLAYERS}`);

    if (this._gameService.checkIfPlayerIsAlreadyInTheGame(user.id))
      throw new ConflictException('Player is already in the game');

    const selectedArmies = await this._armiesService.getAssignedArmies(user.profileId);
    
    const result = await this._matchmakingService.findQuickmatch(user.profileId, requiredPlayers, selectedArmies.map(s => s.armyId));
    return await this._tokenGenerator.create(result);
  }



}