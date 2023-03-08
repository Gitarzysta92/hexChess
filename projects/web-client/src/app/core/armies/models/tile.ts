import { ITileGraphicalData } from "./tile-graphical-data";

export interface ITile {
  id: string;
  name: string;
  type: string;
  copiesInStack: number;
  graphicalData?: ITileGraphicalData;
  imageUrl?: string;
}