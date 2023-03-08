import { ArmyBadgeConfig } from "src/app/shared/components/army-badge/army-badge.component";

export interface IArmyBadge extends ArmyBadgeConfig {
  armyId: string;
  name: string;
};