import { Direction } from "../../../board/constants/tile-sides";
import { AbilityType } from "../constants/ability-type";

export interface AttackDeclaration {
  direction: Direction;
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
