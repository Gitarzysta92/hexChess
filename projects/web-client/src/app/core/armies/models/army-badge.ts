import { IArmyBadgeConfig } from "./army-badge-config";


export interface IArmyBadge extends IArmyBadgeConfig {
  armyId: string;
  name: string;
};