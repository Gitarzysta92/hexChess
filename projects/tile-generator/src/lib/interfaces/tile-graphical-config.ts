import { TileCorner } from "../constants/tile-corner";
import { TileEdge } from "../constants/tile-edge";
import { TileInner } from "../constants/tile-inner";
import { TileType } from "../constants/tile-type";
import { TileArtwork } from "./tile-artwork";
import { TileColors } from "./tile-colors";
import { TileSymbolDeclaration } from "./tile-symbol-declaration";

export interface TileGraphicalConfig {
  type: TileType;
  colors: TileColors;
  artwork?: TileArtwork;
  slots?: TileSymbolDeclaration<TileEdge | TileCorner | TileInner>[];
}