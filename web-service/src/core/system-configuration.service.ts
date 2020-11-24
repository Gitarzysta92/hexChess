
export class SystemConfiguration {

  public playersLimit: number;
  public playersMinimum: number;
  public secret: string;

  constructor() {

    this.playersLimit = 1;
    this.playersMinimum = 1;
    this.secret = 'asd';
  }
}