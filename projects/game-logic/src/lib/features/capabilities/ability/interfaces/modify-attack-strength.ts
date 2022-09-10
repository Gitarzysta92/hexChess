import { Direction } from "../../../board/constants/tile-sides";
import { AbilityType } from "../constants/ability-type";

export interface ModifyAttackStrengthDeclaration {
  attackType: AbilityType.Attack | AbilityType.RangedAttack;
  value: number;
  direction: Direction
}

export interface ModifyAttackStrengthAbility {
  type: AbilityType.ModifyAttackStrength;
  modify: ModifyAttackStrengthDeclaration[];
}