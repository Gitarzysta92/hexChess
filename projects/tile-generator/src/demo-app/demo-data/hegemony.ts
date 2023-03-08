import { ArtworkType } from "../../lib/constants/artwork-type";
import { ShapeName } from "../../lib/constants/shape-name";
import { SymbolType } from "../../lib/constants/symbol-type";
import { TileCorner } from "../../lib/constants/tile-corner";
import { TileEdge } from "../../lib/constants/tile-edge";
import { TileInner } from "../../lib/constants/tile-inner";
import { TileType } from "../../lib/constants/tile-type";

export const hegemony = [
  {
    type: TileType.Headquarter,
    name: "Headquarter",
    colors: { primary: "#edb316", secondary: "#ff7404", tertiary: "#ab4a03" },
    artwork: {
      type: ArtworkType.Shape,
      name: ShapeName.HegemonyIcon
    },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.HeadquarterAttack, modifier: 1 },
      { slot: TileEdge.TopRight, symbol: SymbolType.HeadquarterAttack, modifier: 1 },
      { slot: TileEdge.BottomRight, symbol: SymbolType.HeadquarterAttack, modifier: 1 },
      { slot: TileEdge.Bottom, symbol:  SymbolType.HeadquarterAttack, modifier: 1 },
      { slot: TileEdge.BottomLeft, symbol: SymbolType.HeadquarterAttack, modifier: 1 },
      { slot: TileEdge.TopLeft, symbol: SymbolType.HeadquarterAttack, modifier: 1 },
      { slot: TileCorner.TopLeft, symbol: SymbolType.InitiativeAttribute, modifier: 0 },
      { slot: TileCorner.BottomRight, symbol: SymbolType.ModifyAttackStrength, modifier: 1 }
    ]
  },
  {
    type: TileType.Unit,
    name: "Runner",
    colors: { primary: "#edb316", secondary: "#ff7404", tertiary: "#ab4a03" },
    artwork: {
      type: ArtworkType.Biptmap,
      name: "hegemony_runner" 
    },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.Attack, modifier: 1 },
      { slot: TileCorner.TopLeft, symbol: SymbolType.InitiativeAttribute, modifier: 2 },
      { slot: TileCorner.Left, symbol: SymbolType.MoveAbility, modifier: 1 }
    ]
  },
  {
    type: TileType.Unit,
    name: "Thug",
    colors: { primary: "#edb316", secondary: "#ff7404", tertiary: "#ab4a03" },
    artwork: {
      type: ArtworkType.Biptmap,
      name: "hegemony_thug" 
    },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.Attack, modifier: 2 },
      { slot: TileEdge.TopLeft, symbol: SymbolType.Attack, modifier: 1 },
      { slot: TileEdge.TopRight, symbol: SymbolType.Attack, modifier: 1 },
      { slot: TileCorner.BottomRight, symbol: SymbolType.InitiativeAttribute, modifier: 2 }
    ]
  },
  {
    type: TileType.Unit,
    name: "Ganger",
    colors: { primary: "#edb316", secondary: "#ff7404", tertiary: "#ab4a03" },
    artwork: {
      type: ArtworkType.Biptmap,
      name: "hegemony_ganger" 
    },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.Attack, modifier: 1 },
      { slot: TileCorner.TopLeft, symbol: SymbolType.InitiativeAttribute, modifier: 3 }
    ]
  },
  {
    type: TileType.Unit,
    name: "Gladiator",
    colors: { primary: "#edb316", secondary: "#ff7404", tertiary: "#ab4a03" },
    artwork: {
      type: ArtworkType.Biptmap,
      name: "hegemony_gladiator" 
    },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.Armor },
      { slot: TileEdge.TopLeft, symbol: SymbolType.Armor },
      { slot: TileEdge.TopRight, symbol: SymbolType.Armor },
      { slot: TileEdge.Top, symbol: SymbolType.Attack, modifier: 2 },
      { slot: TileEdge.TopLeft, symbol: SymbolType.Attack, modifier: 2 },
      { slot: TileEdge.TopRight, symbol: SymbolType.Attack, modifier: 2 },
      { slot: TileCorner.BottomLeft, symbol: SymbolType.InitiativeAttribute, modifier: 1 },
      { slot: TileCorner.BottomRight, symbol: SymbolType.ToughnessAttribute, modifier: 1 },
    ]
  },
  {
    type: TileType.Unit,
    name: "Net fighter",
    colors: { primary: "#edb316", secondary: "#ff7404", tertiary: "#ab4a03" },
    artwork: {
      type: ArtworkType.Biptmap,
      name: "hegemony_netfighter" 
    },
    slots: [
      { slot: TileEdge.TopLeft, symbol: SymbolType.Net },
      { slot: TileCorner.Left, symbol: SymbolType.ConstantInitiative, modifier: 1 }
    ]
  },
  {
    type: TileType.Unit,
    name: "Net master",
    colors: { primary: "#edb316", secondary: "#ff7404", tertiary: "#ab4a03" },
    artwork: {
      type: ArtworkType.Biptmap,
      name: "hegemony_netmaster" 
    },
    slots: [
      { slot: TileEdge.TopLeft, symbol: SymbolType.Net },
      { slot: TileEdge.Top, symbol: SymbolType.Attack, modifier: 1 },
      { slot: TileEdge.TopRight, symbol: SymbolType.Net },
      { slot: TileCorner.BottomLeft, symbol: SymbolType.InitiativeAttribute, modifier: 2 },
    ]
  },
  {
    type: TileType.Unit,
    name: "Guard",
    colors: { primary: "#edb316", secondary: "#ff7404", tertiary: "#ab4a03" },
    artwork: {  
      type: ArtworkType.Biptmap,
      name: "hegemony_guard" 
    },
    slots: [
      { slot: TileEdge.TopLeft, symbol: SymbolType.Attack, modfier: 1 },
      { slot: TileEdge.Top, symbol: SymbolType.Attack, modifier: 1 },
      { slot: TileEdge.TopRight, symbol: SymbolType.Attack, modifier: 1 },
      { slot: TileCorner.BottomLeft, symbol: SymbolType.InitiativeAttribute, modifier: 2 },
      { slot: TileCorner.BottomRight, symbol: SymbolType.ToughnessAttribute, modifier: 1 }
    ]
  },
  {
    type: TileType.Unit,
    name: "Universal soldier",
    colors: { primary: "#edb316", secondary: "#ff7404", tertiary: "#ab4a03" },
    artwork: {
      type: ArtworkType.Biptmap,
      name: "hegemony_universalsoldier" 
    },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.RangedAttack, modifier: 1 },
      { slot: TileEdge.Top, symbol: SymbolType.Attack, modifier: 1 },
      { slot: TileCorner.TopLeft, symbol: SymbolType.InitiativeAttribute, modifier: 3 },
    ]
  },
  {
    type: TileType.Module,
    name: "The Boss",
    colors: { primary: "#edb316", secondary: "#ff7404", tertiary: "#ab4a03" },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.ModuleConnector, modifier: 1 },
      { slot: TileEdge.TopLeft, symbol: SymbolType.ModuleConnector, modifier: 1 },
      { slot: TileInner.Center, symbol: SymbolType.ModifyAttackStrength, modifier: 1 },
      { slot: TileInner.Center, symbol: SymbolType.ModifyInitiativeAttribute, modifier: 1 },
      { slot: TileCorner.BottomLeft, symbol: SymbolType.ConstantInitiative, modifier: 1 },
    ]
  },
  {
    type: TileType.Module,
    name: "officer1",
    colors: { primary: "#edb316", secondary: "#ff7404", tertiary: "#ab4a03" },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.ModuleConnector, modifier: 1 },
      { slot: TileEdge.TopLeft, symbol: SymbolType.ModuleConnector, modifier: 1 },
      { slot: TileInner.Center, symbol: SymbolType.ModifyAttackStrength, modifier: 1 },
      { slot: TileCorner.BottomRight, symbol: SymbolType.ConstantInitiative, modifier: 1 },
    ]
  },
  {
    type: TileType.Module,
    name: "officer2",
    colors: { primary: "#edb316", secondary: "#ff7404", tertiary: "#ab4a03" },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.ModuleConnector, modifier: 1 },
      { slot: TileEdge.TopLeft, symbol: SymbolType.ModuleConnector, modifier: 1 },
      { slot: TileEdge.TopRight, symbol: SymbolType.ModuleConnector, modifier: 1 },
      { slot: TileInner.Center, symbol: SymbolType.ModifyAttackStrength, modifier: 1 },
      { slot: TileCorner.BottomRight, symbol: SymbolType.ConstantInitiative, modifier: 1 },
    ]
  },
  {
    type: TileType.Module,
    name: "scout",
    colors: { primary: "#edb316", secondary: "#ff7404", tertiary: "#ab4a03" },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.ModuleConnector, modifier: 1 },
      { slot: TileEdge.TopLeft, symbol: SymbolType.ModuleConnector, modifier: 1 },
      { slot: TileEdge.TopRight, symbol: SymbolType.ModuleConnector, modifier: 1 },
      { slot: TileInner.Center, symbol: SymbolType.ModifyInitiativeAttribute, modifier: 1 },
      { slot: TileCorner.BottomRight, symbol: SymbolType.ConstantInitiative, modifier: 1 },
    ]
  },
  {
    type: TileType.Module,
    name: "transport",
    colors: { primary: "#edb316", secondary: "#ff7404", tertiary: "#ab4a03" },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.ModuleConnector },
      { slot: TileEdge.TopLeft, symbol: SymbolType.ModuleConnector },
      { slot: TileEdge.TopRight, symbol: SymbolType.ModuleConnector },
      { slot: TileEdge.Bottom, symbol: SymbolType.ModuleConnector },
      { slot: TileEdge.BottomRight, symbol: SymbolType.ModuleConnector },
      { slot: TileEdge.BottomLeft, symbol: SymbolType.ModuleConnector },
      { slot: TileInner.Center, symbol: SymbolType.ModifyMoveAbility, modifier: 1 },
      { slot: TileCorner.TopRight, symbol: SymbolType.ConstantInitiative, modifier: 1 },
    ]
  },
  {
    type: TileType.Module,
    name: "quartermaster",
    colors: { primary: "#edb316", secondary: "#ff7404", tertiary: "#ab4a03" },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.ModuleConnector },
      { slot: TileInner.Center, symbol: SymbolType.SwapAttack, modifier: 1 },
      { slot: TileCorner.BottomRight, symbol: SymbolType.ConstantInitiative, modifier: 1 },
    ]
  },
  {
    type: TileType.Action,
    name: "Battle",
    colors: { primary: "#edb316", secondary: "#ff7404", tertiary: "#ab4a03" },
    artwork: {
      type: ArtworkType.Shape,
      name: ShapeName.Battle
    },
  },
  {
    type: TileType.Action,
    name: "Move",
    colors: { primary: "#edb316", secondary: "#ff7404", tertiary: "#ab4a03" },
    artwork: {
      type: ArtworkType.Shape,
      name: ShapeName.Move
    },
  },
  {
    type: TileType.Action,
    name: "Sniper",
    colors: { primary: "#edb316", secondary: "#ff7404", tertiary: "#ab4a03" },
    artwork: {
      type: ArtworkType.Shape,
      name: ShapeName.Sniper
    },
  },
  {
    type: TileType.Action,
    name: "Pushback",
    colors: { primary: "#edb316", secondary: "#ff7404", tertiary: "#ab4a03" },
    artwork: {
      type: ArtworkType.Shape,
      name: ShapeName.Pushback
    },
  }
]