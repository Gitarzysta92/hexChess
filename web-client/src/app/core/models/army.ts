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


export class AssignedArmy {
  id: number;
  profileId: string;
  armyId: number;
  priority: number;

  constructor(data: Partial<AssignedArmy>) {
    this.id = data.id;
    this.profileId = data.profileId;
    this.armyId = data.armyId;
    this.priority = data.priority;
  }


}