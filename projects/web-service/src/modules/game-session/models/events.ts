import { SystemEvent } from "src/core/events/system-event";

export enum GamesType {
  Quickmatch,
  Ranked,
}

abstract class MatchmakingRequestEvent extends SystemEvent {
  public id: string;
  constructor(data) {
    super();
    this.id = data.id;
  }
}


// Matchmaking-request events

// Outgoing
export class MatchmakingRequestResolvedEvent extends MatchmakingRequestEvent {
  constructor(data) {
    super(data);
  }
};

export class MatchmakingRequestReadinessCheckEvent extends MatchmakingRequestEvent { 
  constructor(data) {
    super(data);
  }
};

export class MatchmakingRequestRejectedEvent extends MatchmakingRequestEvent { 
  constructor(data) {
    super(data);
  }
};

// Incoming
export class MatchmakingRequestConfirmationEvent extends MatchmakingRequestEvent { 
  constructor(data) {
    super(data);
  }
};

export class MatchmakingRequestDetachedEvent extends MatchmakingRequestEvent {
  constructor(data: MatchmakingRequestDetachedEvent) {
    super(data);
  }
};



// Matchmaking-handler events

// Outgoing
export class MatchmakingSuccessEvent extends SystemEvent { 
  public id: string;
  public gameType: GamesType;
  public players: string[];
  constructor(data: MatchmakingSuccessEvent) {
    super();
    this.id = data.id;
    this.gameType = data.gameType;
    this.players = data.players;
  }

};

// Outgoing
export class MatchmakingFailureEvent extends SystemEvent { 
  public id: string;
  public players: string[];
  constructor(data: MatchmakingFailureEvent) {
    super();
    this.id = data.id;
    this.players = data.players;
  }
};


