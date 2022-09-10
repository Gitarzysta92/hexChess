import { borgo } from "../../data/armies/borgo/borgo";
import { hegemony } from "../../data/armies/hegemony/hegemony";
import { randomNumbersGenerator } from "../../utils/utils";
import { Tile } from "../board/models/tile";
import { Army } from "./interfaces/army";

export class ArmyHelper {

  static generateArmiesOrder(armyId: string): string[] {
    const army = ArmyHelper.getArmy(armyId);
    const idsList = army.tiles.reduce((acc, curr) => {
      const ids: string[] = [];
      for (let i = 0; i < curr.copiesInStack; i++) 
        ids.push(curr.id)
      return acc.concat(ids);
    }, [] as string[])

    return randomNumbersGenerator(idsList.length).map(n => idsList[n]);
  }

  static getArmyTilesDictionary(armyId: string): { [key: string]: Tile } {
    const army = ArmyHelper.getArmy(armyId);

    return Object.fromEntries(army.tiles.map(t => ([t.id, t])))
  }

  static getArmy(armyId: string): Army {
    const army = [borgo, hegemony].find(a => a.id === armyId);

    if (!army) {
      throw new Error(`Army with given id doesn't exits: ${armyId}`);
    }
    return army;
  }

  static getArmyHeadquarter(armyId: string): Tile {
    return ArmyHelper.getArmy(armyId).headquarter
  }

  static getTile(armyId: string, tileId: string): Tile {
    const army = ArmyHelper.getArmy(armyId); 
    return [...army.tiles, army.headquarter].find(t => t.id === tileId)!;
  }

}