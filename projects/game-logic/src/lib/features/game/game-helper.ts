import { randomNumbersGenerator } from "../../utils/utils";

export class GameHelper {

  static generatePlayersOrder(playerIds: string[]): string[] {
    return randomNumbersGenerator(playerIds.length).map(n => playerIds[n]);
  }

}