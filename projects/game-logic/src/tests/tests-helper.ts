import { borgo } from "../lib/data/armies/borgo/borgo";
import { hegemony } from "../lib/data/armies/hegemony/hegemony";
import { GameConfiguration, GameMode } from "../lib/features/game/models/game-configuration";

export function createGameConfiguration(): GameConfiguration {
  const player1 = {
    id: "a2e29b33-6356-43ed-82e8-3ff452a56b5c",
    name: "Player1",
    armyId: borgo.id,
  };

  const player2 = {
    id: "1a8a4d74-d4df-4979-9a89-c97062749a58",
    name: "Player2",
    armyId: hegemony.id,
  };

  return {
    mode: GameMode.Skirmish,
    playersNumber: 2,
    players: [player1, player2],
    boardSize: 5,
    drawPerTurn: 3,
    startingLife: 35
  } as GameConfiguration
}