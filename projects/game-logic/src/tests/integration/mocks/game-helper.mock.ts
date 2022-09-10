export class GameHelperMock {

  static generatePlayersOrder(playerIds: string[]): string[] {
    return [1, 0].map(n => playerIds[n]);
  }

}