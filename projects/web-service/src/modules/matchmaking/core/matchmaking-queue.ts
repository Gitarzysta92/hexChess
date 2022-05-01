import { Injectable } from "@nestjs/common";
import { Subject } from "rxjs";
import { MatchmakingRequest } from "./matchmaking-request";
import { MatchmakingResult, MatchmakingRoom, MatchmakingPlayer } from "./matchmaking-room";

export interface PlayerTimeoutResult {
  timedPlayer: MatchmakingPlayer,
  roomId: string,
  players: MatchmakingPlayer[]
}

@Injectable()
export class MatchmakingQueue { 
  playerTimedOut$: Subject<PlayerTimeoutResult> = new Subject();
  roomTimedOut$: Subject<MatchmakingRoom> = new Subject();

  private _rooms: MatchmakingRoom[] = [];
  
  constructor() {}

  join(request: MatchmakingRequest): MatchmakingResult {
    let result;

    for (let room of this._rooms) {
      result = room.join(request);
      if (result)
        break;
    }

    if (!result) {
      result = this._createRoom(request).join(request);
    }

    return result;
  }

  confirmJoin(roomId: string, playerId: string): boolean {
    const room = this._rooms.find(r => r.id === roomId);    
    return room?.confirm(playerId);
  }

  isCompleted(roomId: string): boolean {
    const room = this._rooms.find(r => r.id === roomId);
    return room.isCompleted;
  }

  getRoom(roomId: string) {
    return this._rooms.find(r => r.id === roomId);
  }
  
  getPlayers(roomId: string): MatchmakingPlayer[] {
    return this._rooms.find(r => r.id === roomId)?.players;
  }
  
  removePlayer(roomId: string, playerId: string): void {
    const room = this._rooms.find(r => r.id === roomId);
    room?.removePlayer(playerId);
  }

  removeRoom(roomId: string): void {
    this._rooms = this._rooms.filter(r => r.id !== roomId);
  }

  private _createRoom(request: MatchmakingRequest): MatchmakingRoom {
    const room = new MatchmakingRoom();
      room.initialize(request);
      room.onPlayerTimedOut((timedPlayer, roomId, players) => { 
        this.playerTimedOut$.next({ timedPlayer, roomId, players});
      });
      room.onRoomTimedOut(timedRoom => {
        this.roomTimedOut$.next(timedRoom);
        this.removeRoom(timedRoom.id);
      });
      this._rooms.push(room);
      return room;
  }
}   