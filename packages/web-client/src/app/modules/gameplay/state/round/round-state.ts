import { State } from "../../lib/state-machine/state";
import { Activity } from "../../logic/models/activity";
import { Board } from "../../logic/models/board";
import { Round } from "../../logic/models/round";
import { Tile } from "../../logic/models/tile";
import { roundStateTransitionRules } from "./round-transition-rules";

export class RoundState extends State implements Round {

  public id: number;
  public stateName: string;
  public playerId: string;
  public prevRound: Round;
  public holdedTiles: Tile[];
  public availableActions: any;
  public board!: Board;
  public utilizingTile: Tile | undefined;
  public tilesLimit: any;
  public player: any;
  public actions: any; 
  
  public get currentActivity() { return this._activityStack[0] };
  private _activityStack: Activity[] = [];

  constructor(
    data: Partial<RoundState> = {}
  ) {
    super(roundStateTransitionRules);

  }
  discardTiles(_tilesToDiscard: string[]): this {
    throw new Error("Method not implemented.");
  }

  setActivity(arg0: Partial<Activity>) {
    throw new Error("Method not implemented.");
  }

  markTilesToDiscard(_tilesToDiscard: string[]): this {
    return this;  
  }

  setPlayer(playerId: string): void {
    throw new Error("Method not implemented.");
  }
  setTileToUtilize(tileId: string): void {
    throw new Error("Method not implemented.");
  }
  
  utilizizingTile(utilizizingTile: any): RoundState {
    throw new Error("Method not implemented.");
  }
}