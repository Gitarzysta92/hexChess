import { State } from "../../lib/state-machine/state";
import { Player } from "../../logic/models/player";
import { playerStateTransitionRules } from "./player-transition-rules";



export class PlayerState extends State implements Player {
  id!: string;
  holdedTiles: any;
  deck: any;



  constructor(data: Partial<PlayerState> = {}) {
    super(playerStateTransitionRules);
  }
  uuid: string;
  nickname: string;
  armyId: string;
  life: number;
  initiative: number;
  ready: boolean;
  
}