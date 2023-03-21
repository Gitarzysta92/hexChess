import { TileGraphicalConfig } from "@hexchess-tile-generator/index";
import { ITileDto } from "./tile.dto";

export interface IArmyDto {
  id: string;
  name: string;
  icon: string;
  colors?: {
    stroke: string;
    outer: string;
    inner: string;
  },
  tiles: ITileDto[];
  headquarter: ITileDto;
  graphicalData: (TileGraphicalConfig & { id: string })[]
};