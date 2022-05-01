
export class SystemConfiguration {

  public playersLimit: number;
  public playersMinimum: number;
  public secret: string;

  constructor() {

    this.playersLimit = 4;
    this.playersMinimum = 2;
    this.secret = 'asd';
  }
}