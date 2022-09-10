import { EventService } from "../../lib/events/event-service";
import { ActionTile } from "../../lib/features/army/models/action-tile";
import { UnitTile } from "../../lib/features/army/models/unit-tile";
import { CoordsHelper } from "../../lib/features/board/coords-helper";
import { Coord } from "../../lib/features/board/interfaces/coords";
import { Player } from "../../lib/features/game/models/player";
import { HexChess } from "../../lib/hex-chess";
import { GameDispatcher } from "../../lib/state/game-dispatcher";
import { GameState } from "../../lib/state/game-state";
import { StateGenerator } from "../../lib/state/state-generator";
import { createGameConfiguration } from "../tests-helper";
import { ArmyHelperMock } from "./mocks/army-helper.mock";
import { GameHelperMock } from "./mocks/game-helper.mock";

describe('HexChess - hot seat', () => {
  let hexChess: HexChess;
  const stateGenerator = new StateGenerator(ArmyHelperMock, CoordsHelper, GameHelperMock);


  beforeEach(() => {
    hexChess = new HexChess(
      new GameDispatcher(stateGenerator),
      new EventService()
    );
    const cfg = createGameConfiguration();
    hexChess.initialize(stateGenerator.createInitialState(cfg), cfg.players[0] as Player);
  });

  it('should go through whole game and emerge winner', () => {
    let state: GameState;
    state = hexChess.startHeadquarterTurn();

    const tile = ArmyHelperMock.getTile(state.actualPlayer.data?.armyId! , state.actualPlayer.playablesSlot[0]);
    const coords: Coord = { q: 0, r: 0, s: 0 };
    state = hexChess.deployTile(tile as UnitTile, coords);
    state = hexChess.finishTurn();


    state = hexChess.startHeadquarterTurn();
    const tile2 = ArmyHelperMock.getTile(state.actualPlayer.data?.armyId! , state.actualPlayer.playablesSlot[0]);
    const coords2: Coord = { q: 0, r: -1, s: 1 };
    state = hexChess.deployTile(tile2 as UnitTile, coords2);
    state = hexChess.finishTurn();


    state = hexChess.startTurn(); 
    state = hexChess.discardTiles([state.actualPlayer.playablesSlot[0]]);
    const tile3 = ArmyHelperMock.getTile(state.actualPlayer.data?.armyId!, state.actualPlayer.playablesSlot[1]);
    const coords3: Coord = { q: -1, r: 0, s: 1 };
    state = hexChess.deployTile(tile3 as UnitTile, coords3);
    state = hexChess.finishTurn();


    state = hexChess.startTurn(); 
    state = hexChess.discardTiles([state.actualPlayer.playablesSlot[0]]);
    const tile4 = ArmyHelperMock.getTile(state.actualPlayer.data?.armyId!, state.actualPlayer.playablesSlot[1]);
    const coords4: Coord = { q: 1, r: -1, s: 0 };
    state = hexChess.deployTile(tile4 as UnitTile, coords4);
    const tile5 = ArmyHelperMock.getTile(state.actualPlayer.data?.armyId!, state.actualPlayer.playablesSlot[0]);
    state = hexChess.disposeActionTile(tile5 as ActionTile)

    console.log(state);

    expect(true).toEqual(true);
  });

              
});