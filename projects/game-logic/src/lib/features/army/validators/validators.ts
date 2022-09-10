import { GameState, GameStateName } from "../../../state/game-state";
import { ArmyHelper } from "../army-helper";
import { TileType } from "../constants/tile-type.enum";

export function isPlayerDeployingHeadquarter(state: GameState): boolean {
  const tiles = ArmyHelper.getArmyTilesDictionary(state.actualPlayer.data?.armyId!)
  return tiles[state.activityStack[0]?.payload?.tileId]?.type === TileType.Headquarter;
}
