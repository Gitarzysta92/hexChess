
import { IArmyBaseData } from "../models/army";
import { IArmyBadge } from "../models/army-badge";


export function mapArmyBadgeToArmyBaseData(armyBadge: IArmyBadge): IArmyBaseData {
  return Object.assign({}, { 
    id: armyBadge.armyId,
    name: armyBadge.name,
    icon: armyBadge.icon,
    colors: armyBadge.colors
  })
}