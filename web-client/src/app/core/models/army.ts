
export type ArmyColors = { 
  primary: string;
  secondary: string;
  tertiary: string;
 }


export class Army {
  public id: number;
  public icon: string;
  public colors: ArmyColors;
  constructor(data: Army) {
    this.id = data.id;
    this.icon = data.icon;
    this.colors = data.colors;
  }
}