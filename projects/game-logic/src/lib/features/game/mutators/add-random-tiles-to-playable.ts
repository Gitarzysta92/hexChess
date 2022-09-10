import { ActualPlayer } from "../models/actual-player";
import { TileBind } from "../models/tile-bind";

export function addRandomTilesToPlayablesSlot(player: ActualPlayer, keepedTiles: TileBind[]): void {
  const tilesFromPreviousTurn = keepedTiles.filter(tb => tb.playerId === player.data?.id).map(tb => tb.tileId);
  player.playablesSlot = tilesFromPreviousTurn;

  const numberToDraw = player.availableDraw - tilesFromPreviousTurn.length;

  for (let i = 0; i < numberToDraw; i++) {
    const tileId = player?.data?.tilesOrder.shift();
    if (tileId) {
      player.playablesSlot.push(tileId);
    }
  }
} 