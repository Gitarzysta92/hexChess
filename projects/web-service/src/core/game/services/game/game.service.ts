import { Injectable } from '@nestjs/common';
import { SystemConfiguration } from 'src/aspects/events/services/configuration/system-configuration.service';
import { EventService } from 'src/aspects/events/services/events/event.service';
import { MatchmakingCompletedEvent } from 'src/core/matchmaking/events/events';
import { HashGeneratorService } from 'src/shared/utils/hash-generator/hash-generator/hash-generator.service';
import { GameSessionsList } from '../../core/game-sessions-list';
import { GameSessionDto } from '../../models/game-session.dto';

@Injectable()
export class GameService {

  constructor(
    private readonly _eventService: EventService,
    private readonly _gameSessionsList: GameSessionsList,
    private readonly _systemConfiguration: SystemConfiguration,
    private readonly _hashGenerator: HashGeneratorService
  ) {
    this._listenForCompletedMatchmaking();
  }

  public getGameSession(key: string, profileId: string): GameSessionDto {
    const session = this._gameSessionsList.getSession(key);

    if(!session?.armyAssignments.some(a => a.profileId === profileId))
      return;

    return session;
  } 

  public checkIfPlayerIsAlreadyInTheGame(id: any): boolean {
    return false;
  }

  private _listenForCompletedMatchmaking(): void {
    this._eventService.on([MatchmakingCompletedEvent])
      .subscribe((event: MatchmakingCompletedEvent) => {
        const hash = this._hashGenerator.createMd5(event, this._systemConfiguration.secret);
        this._gameSessionsList.addSession({ 
          roomId: event.roomId,
          timestamp: event.timestamp
        }, hash);
      })
  }


}
