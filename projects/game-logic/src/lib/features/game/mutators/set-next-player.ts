import { PlayersDictionary } from "../aliases/players-dictionary";
import { ActualPlayer } from "../models/actual-player";
import { GameMetadata } from "../models/game-configuration";

export function setNextPlayer(actualPlayer: ActualPlayer, players: PlayersDictionary, meta: GameMetadata): void {
  const firstTurnInGame = !actualPlayer.data;
  
  if (firstTurnInGame) {
    actualPlayer.data = players[meta.playersOrder[0]]
  } else {
    const currentPlayerIndex = meta.playersOrder.indexOf(actualPlayer.data?.id!);
    const nextPlayerIndex = currentPlayerIndex === meta.playersOrder.length - 1 ? 0 : currentPlayerIndex + 1;
    actualPlayer.data = players[meta.playersOrder[nextPlayerIndex]];
    actualPlayer.actionsSlot = [];
    actualPlayer.playablesSlot = [];
  }
}