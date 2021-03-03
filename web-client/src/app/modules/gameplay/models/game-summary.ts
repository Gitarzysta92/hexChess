export class GameSummary {

  victory: boolean

  constructor(data: Partial<GameSummary>) {
    this.victory = data.victory;
  }
}