import { ArmyHelper } from "../../../lib/features/army/army-helper";
import { Army } from "../../../lib/features/army/interfaces/army";
import { Tile } from "../../../lib/features/board/models/tile";

export class ArmyHelperMock {

  static generateArmiesOrder(armyId: string): string[] {
    const army = ArmyHelper.getArmy(armyId);
    const idsList = army.tiles.reduce((acc, curr) => {
      const ids: string[] = [];
      for (let i = 0; i < curr.copiesInStack; i++) 
        ids.push(curr.id)
      return acc.concat(ids);
    }, [] as string[])
    
    return [
      24,  9, 14,  4, 16, 27, 21,  8, 28,
      31, 13, 12, 33, 34, 15,  5, 10,  1,
      19, 26, 17, 11, 23, 29,  7, 20, 25,
       3, 32,  2,  0, 30, 22, 18,  6
    ].map(n => idsList[n]);
  }

  static getArmyTilesDictionary(armyId: string): { [key: string]: Tile } {
    return ArmyHelper.getArmyTilesDictionary(armyId);
  }

  static getArmy(armyId: string): Army {
    return ArmyHelper.getArmy(armyId);
  }

  static getArmyHeadquarter(armyId: string): Tile {
    return ArmyHelper.getArmy(armyId).headquarter
  }

  static getTile(armyId: string, tileId: string): Tile {
    return ArmyHelper.getTile(armyId, tileId);
  }

}