import { IArmyBadge } from '../../armies/api';

export class MatchedPlayer {
  public avatarUrl: string;
  public name: string;
  public army: IArmyBadge;

  constructor(data: Partial<MatchedPlayer>) {
    this.avatarUrl = data.avatarUrl;
    this.army = data.army;
    this.name = data.name;
  }
}