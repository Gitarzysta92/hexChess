import { ArmyBadgeConfig } from "src/app/shared/components/army-badge/army-badge.component";
import { HexagonColors } from "src/app/shared/components/hexagon/hexagon.component";


export class ArmyBadge implements ArmyBadgeConfig {
  public id: string;
  public name: string;
  public icon: string;
  public colors: HexagonColors;
  constructor(data: ArmyBadge) {
    this.id = data.id;
    this.name = data.name;
    this.icon = data.icon;
    this.colors = data.colors;
  }
}


export class AssignedArmy   {
  id: number;
  profileId: string;
  armyId: string;
  priority: number;

  constructor(data: Partial<AssignedArmy>) {
    this.id = data.id;
    this.profileId = data.profileId;
    this.armyId = data.armyId;
    this.priority = data.priority;
  }
}

export class MySelectedArmy {
  id: number;
  armyName: string;
  armyId: string;
  priority: number;

  constructor(data: Partial<MySelectedArmy>) {
    this.id = data.id;
    this.armyId = data.armyId;
    this.priority = data.priority;
    this.armyName = data.armyName;
  }

  static fromArmyBadge(data: ArmyBadge, priority?: number): MySelectedArmy {
    return new MySelectedArmy({ 
      armyId: data.id, 
      armyName: data.name,
      priority 
    }); 
  }

}