import { ActualPlayer } from "../models/actual-player";
import { TileBind } from "../models/tile-bind";

export function addHeadquarterToPlayablesSlot(player: ActualPlayer, keepedTiles: TileBind[]): void {
  player.playablesSlot = [];
  player.playablesSlot.push(player.data?.headquarterId!);
} 