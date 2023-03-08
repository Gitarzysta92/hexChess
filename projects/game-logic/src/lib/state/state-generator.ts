import { v4 as uuid } from "uuid";
import { ArmyHelper } from "../features/army/army-helper";
import { TileId } from "../features/board/aliases/tile-id";
import { BoardService } from "../features/board/board-service";
import { CoordsHelper } from "../features/board/coords-helper";
import { Action } from "../features/capabilities/action/models/action";
import { Effect } from "../features/capabilities/effect/models/effect";
import { GameHelper } from "../features/game/game-helper";
import { GameConfiguration } from "../features/game/models/game-configuration";
import { Player } from "../features/game/models/player";
import { TileBind } from "../features/game/models/tile-bind";
import { Activity, ActivityName } from "./activity.interface";
import { GameState, GameStateName } from "./game-state";


export class StateGenerator {

  constructor(
    private readonly _armyHelper: typeof ArmyHelper,
    private readonly _coordsHelper: typeof CoordsHelper,
    private readonly _gameHelper: typeof GameHelper
  ) {}

  createInitialState(cfg: GameConfiguration): GameState {
    return {
      id: uuid(),
      round: 1,
      name: GameStateName.Started,
      metadata: {
        mode: cfg.mode,
        playersNumber: cfg.playersNumber,
        playersOrder: this._gameHelper.generatePlayersOrder(cfg.players.map(p => p.id)),
        boardSize: cfg.boardSize
      },
      players: Object.fromEntries(cfg.players.map(p => ([p.id, { 
        id: p.id,
        name: p.name,
        armyId: p.armyId,
        tilesOrder: this._armyHelper.generateArmiesOrder(p.armyId),
        headquarterId: this._armyHelper.getArmyHeadquarter(p.armyId).id
      } as Player ]))),
      actualPlayer: {
        data: undefined,
        playablesSlot: [] as TileId[],
        actionsSlot: [] as Action[],
        availableTilesDraw: cfg.drawPerTurn,
        numberOfTilesToKeep: cfg.tilesToKeepPerTurn
      },
      keepedTiles: [] as TileBind[],
      utilizedTiles: [] as TileBind[],
      activityStack: [
        { name: ActivityName.Initialization }
      ] as Activity[],
      effects: [] as Effect[],
      board: new BoardService(this._coordsHelper).initialize(cfg.boardSize),
      prevState: null,
      battleResolver: undefined,
      winnerId: null
    }
  }

  getCopyOfState(gameState: GameState): GameState {
    const copy = JSON.parse(JSON.stringify(gameState)) as GameState;
    copy.battleResolver = gameState.battleResolver;
    copy.board = new BoardService(this._coordsHelper).initialize(copy.metadata.boardSize, copy.board.coords, copy.board.fields);
    return copy;
  }
}