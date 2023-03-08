import { IArmyBadge } from "../api";
import { IArmyBaseData } from "../models/army";


export function mapArmyBadgeToArmyBaseData(armyBadge: IArmyBadge): IArmyBaseData {
  return Object.assign({}, { 
    id: armyBadge.armyId,
    name: armyBadge.name,
    icon: armyBadge.icon,
    colors: armyBadge.colors
  })
}