import { ArmyBadgeConfig } from "src/app/shared/misc/components/army-badge/army-badge.component";
import { ITile } from "./tile";

export interface IArmy extends IArmyBaseData {
  tiles: ITile[];
  headquarter: ITile;
};

export interface IArmyBaseData extends ArmyBadgeConfig {
  id: string;
  name: string;
};
