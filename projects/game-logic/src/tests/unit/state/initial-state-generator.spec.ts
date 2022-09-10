import { ArmyHelper } from "../../../lib/features/army/army-helper";
import { CoordsHelper } from "../../../lib/features/board/coords-helper";
import { GameHelper } from "../../../lib/features/game/game-helper";
import { GameStateName } from "../../../lib/state/game-state";
import { StateGenerator } from "../../../lib/state/state-generator";
import { createGameConfiguration } from "../../tests-helper";


describe('Initial state generator', () => {
  let stateGenerator: StateGenerator;

  beforeEach(() => {
    stateGenerator = new StateGenerator(ArmyHelper, CoordsHelper, GameHelper);
  });

  it('expect true to be true', () => {
    const cfg = createGameConfiguration();
    const state = stateGenerator.createInitialState(cfg);

    expect(state).toBeTruthy();
    expect(Object.keys(state.players).length).toEqual(cfg.playersNumber);
    expect(state.name).toEqual(GameStateName.Started);
  });
        
});

