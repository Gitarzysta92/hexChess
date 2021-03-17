import { ArmyBadgeSetup } from "src/app/shared/components/army-badge/army-badge.component";
import { HexagonColors } from "src/app/shared/components/hexagon/hexagon.component";


export class Army implements ArmyBadgeSetup {
  public id: number;
  public icon: string;
  public colors: HexagonColors;
  constructor(data: Army) {
    this.id = data.id;
    this.icon = data.icon;
    this.colors = data.colors;
  }
}