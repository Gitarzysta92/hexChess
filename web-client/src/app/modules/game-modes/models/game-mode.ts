import { GameModeType } from "src/app/constants/game-mode-type.enum";


export class GameMode {
  public id: number;
  public type: GameModeType;
  public players: number;
  public name: string;
  public description: string;
  public image: string;

  constructor(data: Partial<GameMode>) {
    this.id = data.id;
    this.type = data.type;
    this.players = data.players;
    this.name = data.name;
    this.description = data.description;
    this.image = data.image;
  }
}
