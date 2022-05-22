export interface PlayerArmyAssignment {
  armyId: number;
  id: string;
}

export class GameSession {
  id: string;
  gameState: { checksum: string };
  armyAssignments: PlayerArmyAssignment[];
}