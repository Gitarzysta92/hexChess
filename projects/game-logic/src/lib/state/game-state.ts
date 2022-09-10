import { Activity } from "./activity.interface";
import { Effect } from "../features/capabilities/effect/models/effect";
import { GameMetadata } from "../features/game/models/game-configuration";
import { ActualPlayer } from "../features/game/models/actual-player";
import { TileBind } from "../features/game/models/tile-bind";
import { Board } from "../features/board/interfaces/board";
import { BattleResult } from "../features/battle/mutators/battle-resolver";
import { PlayersDictionary } from "../features/game/aliases/players-dictionary";


export enum GameStateName {
  Started = 'Started',
  Ended = 'Ended',
  Round = 'Round',
  HeadquarterRound = 'HeadquarterRound',
  Battle = 'Battle'
}

export interface GameState {
  // metadata + players (hash)
  id: string;
  round: number;
  name: GameStateName;
  metadata: GameMetadata;
  players: PlayersDictionary;
  actualPlayer: ActualPlayer;
  keepedTiles: TileBind[];
  utilizedTiles: TileBind[];
  activityStack: Activity[];
  board: Board;
  effects: Effect[];
  prevState: GameState | null;
  battleResolver: Generator<BattleResult> | undefined;
}