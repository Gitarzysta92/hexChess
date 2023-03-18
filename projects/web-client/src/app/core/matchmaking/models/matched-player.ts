import { ArmyBadgeConfig } from 'src/app/shared/misc/components/army-badge/army-badge.component';
import { HexagonColors } from 'src/app/shared/misc/components/hexagon/hexagon.component';



export class MatchedPlayer {
  public avatarUrl: string;
  public name: string;
  public army: Army;

  constructor(data: Partial<MatchedPlayer>) {
    this.avatarUrl = data.avatarUrl;
    this.army = data.army;
    this.name = data.name;
  }
}

export class Army implements ArmyBadgeConfig {
  icon: string;
  colors?: HexagonColors;
  constructor(data: Partial<Army>) {
    Object.assign(this, data);
  }

}
