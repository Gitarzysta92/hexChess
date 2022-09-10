import { GameState } from "./game-state";
import { Player } from "../features/game/models/player";
import { Activity, ActivityName } from "./activity.interface";
import { isHeadquarterDeployingRound, isNotHeadquarterDeployingRound } from "../features/game/validators/validators";
import { isPlayerDeployingHeadquarter } from "../features/army/validators/validators";
import { TileType } from "../features/army/constants/tile-type.enum";
import { ArmyHelper } from "../features/army/army-helper";
import { ValidationError } from "../extensions/validation-error";

export const consequentActivities: { [key: string]: {[key: string]: (gameState: GameState, activity: Activity, authority: Player) => void} } = {
  ["*"]: {
    [ActivityName.ResponseRequest]: () => true
  },
  [ActivityName.ResponseRequest]: {
    [ActivityName.Reponse]: () => true,
  },
  [ActivityName.Reponse]: {
    ["*"]: () => true,
  },
  [ActivityName.Initialization]: {
    [ActivityName.StartTurn]: gameState => true
  },
  [ActivityName.FinishTurn]: {
    [ActivityName.StartTurn]: () => true,
  },
  [ActivityName.StartTurn]: {
    [ActivityName.DrawTiles]: state => isNotHeadquarterDeployingRound(state),
    [ActivityName.DrawHeadquarter]: state => isHeadquarterDeployingRound(state)
  },
  [ActivityName.DrawHeadquarter]: {
    [ActivityName.DeployTile]: state => (isHeadquarterDeployingRound(state), isPlayerDeployingHeadquarter(state)),
  },
  [ActivityName.DrawTiles]: {
    [ActivityName.DiscardTiles]: () => true,
  },
  [ActivityName.DiscardTiles]: {
    [ActivityName.DeployTile]: (state, activity) => isPlayerDeployingUnit(state, activity),
    [ActivityName.DisposeActionTile]: () => true,
    [ActivityName.DisposeAction]: () => true,
    [ActivityName.FinishTurn]: () => true,
  },
  [ActivityName.DeployTile]: {
    [ActivityName.DeployTile]: () => true,
    [ActivityName.DisposeActionTile]: () => true,
    [ActivityName.DisposeAction]: () => true,
    [ActivityName.FinishTurn]: () => true,
  },
  [ActivityName.DisposeActionTile]: {
    [ActivityName.DeployTile]: () => true,
    [ActivityName.DisposeActionTile]: () => true,
    [ActivityName.DisposeAction]: () => true,
    [ActivityName.FinishTurn]: () => true,
  },
  [ActivityName.DisposeAction]: {
    [ActivityName.DeployTile]: () => true,
    [ActivityName.DisposeActionTile]: () => true,
    [ActivityName.DisposeAction]: () => true,
    [ActivityName.FinishTurn]: () => true,
  },
}



function isPlayerDeployingUnit(state: GameState, activity: Activity): void {

  if (ArmyHelper.getTile(state.actualPlayer.data?.armyId!, activity.payload?.tile.id!).type === TileType.Unit)
    return;

  throw new ValidationError(`${isPlayerDeployingUnit.name}`);
}