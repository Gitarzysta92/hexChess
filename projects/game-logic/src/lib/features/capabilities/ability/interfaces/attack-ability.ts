import { TileSide } from "../../../board/constants/tile-side";
import { AbilityType } from "../constants/ability-type";

export interface AttackDeclaration {
  direction: TileSide;
  value: number;
  initiativeModifier: number;
}

export interface AttackAbility {
  type: AbilityType.Attack,
  attack: AttackDeclaration[];
}

export interface RangedAttackAbility {
  type: AbilityType.RangedAttack,
  attack: AttackDeclaration[];
}
