import { IPlayerArmyAssignment } from "../models/player-army-assignment";

export class GameSession {
  id: string;
  gameState: { checksum: string };
  armyAssignments: IPlayerArmyAssignment[];
}