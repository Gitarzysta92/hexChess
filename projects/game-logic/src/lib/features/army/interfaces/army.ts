import { Tile } from "../../board/models/tile";

export interface Army {
  id: string;
  name: string;
  tiles: Tile[];
  headquarter: Tile;
}