import { Injectable } from '@nestjs/common';
import { timeout } from 'rxjs';
import { EventService } from 'src/aspects/events/services/events/event.service';
import { GameType } from '../../consts/game-types';
import { MatchmakingQueue } from '../../core/matchmaking-queue';
import { MatchmakingRequest } from '../../core/matchmaking-request';
import { MatchmakingResult, MatchmakingPlayer } from '../../core/matchmaking-room';
import { MatchmakingCompletedEvent, MatchmakingRejectedEvent, PlayerJoinedToMatchmakingRoomEvent, PlayerLeftMatchmakingRoomEvent } from '../../events/events';

@Injectable()
export class MatchmakingService {

  constructor(
    private readonly _matchmakingQueue: MatchmakingQueue,
    private readonly _eventService: EventService
  ) { 
    this._listenForQueueEvents();
  }


  public async findQuickmatch( profileId: string, requiredPlayers: number, selectedArmies: number[] ): Promise<MatchmakingResult> {
    const matchRequest = new MatchmakingRequest({
      profileId: profileId, 
      playersNumber: requiredPlayers, 
      gameType: GameType.Quickmatch,
      selectedArmiesIds: selectedArmies
    });
    return this._matchmakingQueue.join(matchRequest);
  }

  public async confirmMatchmakingJoin(roomId: string, playerId: string): Promise<boolean> {
    const confirmed = this._matchmakingQueue.confirmJoin(roomId, playerId);

    if (!confirmed)
      return

    this._eventService.emit(new PlayerJoinedToMatchmakingRoomEvent({
      playerJoinId: playerId,
      roomId: roomId,
      players: this._matchmakingQueue.getPlayers(roomId)
    }));
    if (this._matchmakingQueue.isCompleted(roomId)) {
      const matchmaking = this._matchmakingQueue.getRoom(roomId);
      this._eventService.emit(new MatchmakingCompletedEvent({
          roomId: matchmaking.id,
          players: matchmaking.players.map(p => ({
            id: p.id,
            isConfirmed: p.isConfirmed,
            armyId: p.armyId,
            timeout: p.timeout
          })),
          requiredPlayers: matchmaking.requiredPlayers,
          creationDate: matchmaking.creationDate,
          gameType: matchmaking.gameType
      }));
    }

    return confirmed;
  }
  
  public leaveMatchmaking(roomId: string, playerId: string): void {
    this._matchmakingQueue.removePlayer(roomId, playerId);
  }

  public getPlayersInTheRoom(roomId: string): MatchmakingPlayer[] {
    return this._matchmakingQueue.getPlayers(roomId);
  }

  public isRoomExists(roomId: string): boolean {
    return !!this._matchmakingQueue.getRoom(roomId);
  }

  private _listenForQueueEvents(): void {
    this._matchmakingQueue.playerTimedOut$
      .subscribe(result => {
        this._eventService.emit(new PlayerLeftMatchmakingRoomEvent({
          playerLeftId: result.timedPlayer.id,
          roomId: result.roomId,
          players: result.players
        }))
      });

    this._matchmakingQueue.roomTimedOut$
      .subscribe(timedRoom => {
        this._eventService.emit(new MatchmakingRejectedEvent({ roomId: timedRoom.id }))
      });
  }
}