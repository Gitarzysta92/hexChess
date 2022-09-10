import { ArmorAbility } from "./armor-ability";
import { AttackAbility, RangedAttackAbility } from "./attack-ability";
import { HealAbility } from "./heal-ability";
import { ModifyAttackStrengthAbility } from "./modify-attack-strength";
import { ModifyAttributeAbility } from "./modify-attribute-ability";
import { MoveAbility } from "./move-ability";
import { NetAbility } from "./net-ability";
import { ProvideAbility } from "./provide-ability";

export type AbilityDeclarations = Array<
  AttackAbility |
  RangedAttackAbility |
  ModifyAttributeAbility | 
  ArmorAbility | 
  NetAbility |
  HealAbility |
  ModifyAttackStrengthAbility | 
  MoveAbility |
  ProvideAbility
>

export interface Abilities {
  abilities: AbilityDeclarations;
}