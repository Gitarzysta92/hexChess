import { MatchmakingPlayerDto } from "./matchmaking-player";

export class RoomPlayersUpdateEvent {
  players: MatchmakingPlayerDto[]
  constructor(data: Partial<RoomPlayersUpdateEvent>) {
    Object.assign(this, data);
  }
}

export class MatchmakingCompletedEvent {
  token: string;
  constructor(data: Partial<MatchmakingCompletedEvent>) {
    Object.assign(this, data);
  }
}

export class MatchmakingRejectedEvent {
  constructor() {}
}