import { TileSide } from "../../../board/constants/tile-side";
import { AbilityType } from "../constants/ability-type";

export interface ModifyAttackStrengthDeclaration {
  attackType: AbilityType.Attack | AbilityType.RangedAttack;
  value: number;
  direction: TileSide
}

export interface ModifyAttackStrengthAbility {
  type: AbilityType.ModifyAttackStrength;
  modify: ModifyAttackStrengthDeclaration[];
}