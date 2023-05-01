import { IArmyBadgeConfig } from "./army-badge-config";
import { ITile } from "./tile";

export interface IArmy extends IArmyBaseData {
  tiles: ITile[];
  headquarter: ITile;
};

export interface IArmyBaseData extends IArmyBadgeConfig {
  id: string;
  name: string;
};
