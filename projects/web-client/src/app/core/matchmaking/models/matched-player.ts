import { IArmy } from '../../armies/api';

export class MatchedPlayer {
  public avatarUrl: string;
  public name: string;
  public army: IArmy;

  constructor(data: Partial<MatchedPlayer>) {
    this.avatarUrl = data.avatarUrl;
    this.army = data.army;
    this.name = data.name;
  }
}