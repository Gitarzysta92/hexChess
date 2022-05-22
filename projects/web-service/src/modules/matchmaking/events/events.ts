import { MatchmakingPlayer } from "../core/matchmaking-room";
import { Event } from "src/aspects/events/services/events/event"
import { GameType } from "../consts/game-types";


export class PlayerLeftMatchmakingRoomEvent extends Event {
  roomId: string;
  players: MatchmakingPlayer[];
  playerLeftId: string;
  timestamp: number;

  constructor(data: Partial<PlayerLeftMatchmakingRoomEvent>) {
    super();
    Object.assign(this, data);
    this.timestamp = Date.now();
  }
}

export class MatchmakingCompletedEvent extends Event {
  roomId: string;
  gameType: GameType;
  requiredPlayers: number;
  players: MatchmakingPlayer[] = [];
  creationDate: Date = new Date();
  timestamp: number;

  constructor(data: Partial<MatchmakingCompletedEvent>) {
    super();
    Object.assign(this, data);
    this.timestamp = Date.now();
  }
}

export class MatchmakingRejectedEvent extends Event {
  roomId: string;
  timestamp: number;
  constructor(data: Partial<MatchmakingRejectedEvent>) {
    super();
    Object.assign(this, data);
    this.timestamp = Date.now();
  }
}