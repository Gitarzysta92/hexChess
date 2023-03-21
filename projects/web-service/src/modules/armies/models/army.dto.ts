import { ITileDto } from "./tile.dto";
import { TileGraphicalConfig } from "@hexchess-tile-generator/index";

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
  graphicalData: TileGraphicalConfig[]
};