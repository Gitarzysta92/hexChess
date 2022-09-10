import { TileId } from "../../board/aliases/tile-id";
import { ActualPlayer } from "../models/actual-player";
import { TileBind } from "../models/tile-bind";

export function removeTilesFromPlayable(player: ActualPlayer, tileIds: TileId[], utilizedTiles: TileBind[]): void {

  const newPlayables: string[] = [];

  for (let playableTileId of player.playablesSlot) {
    const tileId = tileIds.find(id => id === playableTileId);
    if (tileId) {
      utilizedTiles.push({ playerId: player.data?.id!, tileId: tileId });
    } else {
      newPlayables.push(playableTileId);
    }
  }

  player.playablesSlot = newPlayables;
}