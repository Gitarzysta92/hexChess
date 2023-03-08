import { IArmyBadge } from "../api";
import { IArmy } from "../models/army";


export function mapArmyToArmyBadge(army: IArmy): IArmyBadge {
  return Object.assign({}, { 
    armyId: army.id,
    name: army.name,
    icon: army.icon,
    colors: army.colors
  })
}