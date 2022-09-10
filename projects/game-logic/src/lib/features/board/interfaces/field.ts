import { Tile } from "../models/tile";

export interface Field {
  isOccupied: boolean;
  tile: Tile | null | undefined;
  surface: Tile | null | undefined;
}