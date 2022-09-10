import { TileType } from "../../army/constants/tile-type.enum";


export class Tile {
  type!: TileType; 
  id!: string;
  name!: string;
  payload!: { [key: string]: any }
  copiesInStack!: number;

  constructor(data: Partial<Tile>) {
    Object.assign(this, data);
  }
}


