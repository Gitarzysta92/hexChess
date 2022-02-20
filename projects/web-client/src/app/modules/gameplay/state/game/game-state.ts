import { State } from "../../lib/state-machine/state";
import { Board } from "../../logic/models/board";
import { Game } from "../../logic/models/game";
import { PlayerState } from "../player/player-state";
import { RoundState } from "../round/round-state";
import { gameStateTransitionRules } from "./game-transition-rules";

export class GameState extends State implements Game {
  setPlayers(players: import("../../models/player").Player[]) {
    throw new Error("Method not implemented.");
  }
 
  id!: string;
  round: RoundState;

  constructor(data: Partial<GameState> = {}) {
    super(gameStateTransitionRules);

    this.players = data.players || [];

  }
  public players: PlayerState[];
  public winner: PlayerState;
  public currentPlayer: PlayerState;
  public playersOrder: PlayerState;
  public board: Board;
  
}