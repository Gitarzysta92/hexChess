import { IArmyBadge } from "../../armies/api";

export interface IPlayer {
  id: string;
  armyId: string;
  nickname: string;
  armyBadge: IArmyBadge;
  avatarUrl: string;
}