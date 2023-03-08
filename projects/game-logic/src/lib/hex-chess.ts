import { Tile } from "./features/board/models/tile";
import { GameState } from "./state/game-state";
import { GameDispatcher } from "./state/game-dispatcher";
import { startTurn } from "./state/activities/start-turn";
import { drawTiles } from "./state/activities/draw-tiles";
import { deployTile } from "./state/activities/deploy-tile";
import { discardTiles } from "./state/activities/discard-tiles";
import { disposeActionTile } from "./state/activities/dispose-action-tile";
import { moveTile } from "./state/activities/move-tile";
import { Coord } from "./features/board/interfaces/coords";
import { ActionTile } from "./features/army/models/action-tile";
import { ReplaySubject } from "rxjs";
import { finishTurn } from "./state/activities/finish-turn";
import { leaveGame } from "./state/activities/leave-game";
import { EventService } from "./events/event-service";
import { Player } from "./features/game/models/player";
import { TileId } from "./features/board/aliases/tile-id";
import { startHeadquarterTurn } from "./state/activities/start-headquarter-turn";
import { UnitTile } from "./features/army/models/unit-tile";




export class HexChess {

  public stateChanged$: ReplaySubject<GameState> 

  private _events: ReplaySubject<unknown> = new ReplaySubject();
  private _directiveContext = {
    emitEvent: (name: string, payload: any) => this._events.next({ name, payload })
  }

  constructor(
    private readonly _gameDispatcher: GameDispatcher,
    private readonly _eventService: EventService
  ) { 
    this.stateChanged$ = this._gameDispatcher.stateChange$;
  }
  

  initialize(gameState: any, authority: Player) {
    this._gameDispatcher.initialize(gameState, authority);
  }

  startHeadquarterTurn(): GameState {
    return this._gameDispatcher
      .next(startHeadquarterTurn())
      .getCurrentStateCopy();
  }
  
  // event TurnStarted
  startTurn(): GameState {
    let state;
    try {
      state = this._gameDispatcher
        .next(startTurn())
        .next(drawTiles())
        .getCurrentStateCopy()
    } catch (e) {
      throw e;
      //throw new Error("Cannot start new game");  
    }
    return state;
  }

  // event TilesDropped
  discardTiles(tileIds: TileId[]) {
    let state;
    try {
      state = this._gameDispatcher
        .next(discardTiles(tileIds))
        .getCurrentStateCopy()
    } catch (e) {
      throw e;
      //throw new Error(`Cannot discard given tiles: ${tiles.map(t => t.name).join(',')}`);  
    }
    return state;
  
  }

  // event: TileDeployed
  deployTile(tile: UnitTile, coords: Coord) {
    let state;
    try {
      state = this._gameDispatcher
        .next(deployTile(tile, coords))
        .getCurrentStateCopy()
    } catch (e) {
      throw e;
      //throw new Error(`Cannot deploy tile: ${tile.name}`);  
    }
    return state;
  }

  // event: ActionDisposed
  disposeActionTile(tile: ActionTile) {
    let state;
    try {
      state = this._gameDispatcher
        .next(disposeActionTile(tile))
        .getCurrentStateCopy()
    } catch (e) {
      throw e;
      //throw new Error(`Cannot dispose action tile: ${tile.name}`);  
    }
    return state;
  }
    
  moveTile(tile: Tile) {
    let state;
    try {
      state = this._gameDispatcher
        .next(moveTile(tile))
        .getCurrentStateCopy()
    } catch (e) {
      throw e;
      //throw new Error(`Cannot dispose action tile: ${tile.name}`);  
    }
    return state;
  }

  // event: RoundStarted
  // event: RoundFinished
  finishTurn() {
    let state;
    try {
      state = this._gameDispatcher
        .next(finishTurn())
        .getCurrentStateCopy()
    } catch (e) {
      throw e;
      //throw new Error(`Cannot dispose action tile: ${tile.name}`);  
    }
    return state;
  }
  
  // event PlayerLeftGame
  leave(player: any) {
    let state;
    try {
      state = this._gameDispatcher
        .next(leaveGame())
        .getCurrentStateCopy()
    } catch (e) {
      throw e;
      //throw new Error(`Cannot dispose action tile: ${tile.name}`);  
    }
    return state;
  }
  
  rollbackActivity() {
    this._gameDispatcher.prev();
  }


  getCurrentState(): GameState {
    return this._gameDispatcher.getCurrentStateCopy();
  }
}