export interface IMatchmakingResult {
  id: string;
  armyAssignment: IArmyAssignment[];
}

export interface IArmyAssignment {
  profileId: string;
  armyId: string;
}