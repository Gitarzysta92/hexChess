import { ArtworkType } from "../../lib/constants/artwork-type";
import { SymbolType } from "../../lib/constants/symbol-type";
import { TileCorner } from "../../lib/constants/tile-corner";
import { TileEdge } from "../../lib/constants/tile-edge";
import { TileType } from "../../lib/constants/tile-type";

export const tileDeclaration = {
  type: TileType.Unit,
  colors: {
    primary: "#edb316",
    secondary: "#ff7404",
    tertiary: "#ab4a03"
  },
  artwork: {
    type: ArtworkType.Biptmap,
    name: "test" 
  },
  slots: [
    {
      slot: TileEdge.Top,
      symbol: SymbolType.Attack,
      modifier: 2
    },
    {
      slot: TileCorner.TopLeft,
      symbol: SymbolType.InitiativeAttribute,
      modifier: 3
    }
  ]
}

export const tileDeclarationEdges = {
  type: TileType.Unit,
  colors: {
    primary: "#edb316",
    secondary: "#ff7404",
    tertiary: "#ab4a03"
  },
  artwork: {
    type: ArtworkType.Biptmap,
    name: "test" 
  },
  slots: [
    {
      slot: TileEdge.Top,
      symbol: SymbolType.Attack,
      modifier: 2
    },
    {
      slot: TileEdge.TopRight,
      symbol: SymbolType.Attack,
      modifier: 2
    },
    {
      slot: TileEdge.BottomRight,
      symbol: SymbolType.Attack,
      modifier: 2
    },
    {
      slot: TileEdge.Bottom,
      symbol: SymbolType.Attack,
      modifier: 2
    },
    {
      slot: TileEdge.BottomLeft,
      symbol: SymbolType.Attack,
      modifier: 2
    },
    {
      slot: TileEdge.TopLeft,
      symbol: SymbolType.Attack,
      modifier: 2
    },
    {
      slot: TileCorner.TopRight,
      symbol: SymbolType.Attack,
      modifier: 2
    },
    {
      slot: TileCorner.Right,
      symbol: SymbolType.Attack,
      modifier: 2
    },
    {
      slot: TileCorner.BottomRight,
      symbol: SymbolType.Attack,
      modifier: 2
    },
    {
      slot: TileCorner.BottomLeft,
      symbol: SymbolType.Attack,
      modifier: 2
    },
    {
      slot: TileCorner.Left,
      symbol: SymbolType.Attack,
      modifier: 2
    },
    {
      slot: TileCorner.TopLeft,
      symbol: SymbolType.Attack,
      modifier: 2
    },

  ]
}