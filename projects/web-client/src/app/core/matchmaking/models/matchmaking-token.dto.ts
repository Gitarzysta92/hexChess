export interface IMatchmakingTokenDto {
  roomId: string;
  playerId: string;
  requiredPlayers: number;
  choosenArmyId: string;
  timestamp: number;
  raw: string;
};
