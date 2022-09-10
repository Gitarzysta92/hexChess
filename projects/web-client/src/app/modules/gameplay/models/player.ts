import { ArmyBadge } from "../../game-modes/models/army";

export class Player {
  id: string;
  armyId: string;
  nickname: string;
  armyBadge: ArmyBadge;
  avatarUrl: string;
  constructor(data: Partial<Player>) {
    Object.assign(this, data);
  }
}
