import { ArtworkType } from "../../lib/constants/artwork-type";
import { ShapeName } from "../../lib/constants/shape-name";
import { SymbolType } from "../../lib/constants/symbol-type";
import { TileCorner } from "../../lib/constants/tile-corner";
import { TileEdge } from "../../lib/constants/tile-edge";
import { TileInner } from "../../lib/constants/tile-inner";
import { TileType } from "../../lib/constants/tile-type";

export const borgo = [
  {
    type: TileType.Headquarter,
    name: "Headquarter",
    colors: { primary: "#30c2ff", secondary: "#1a406b", tertiary: "#0578fa" },
    artwork: {
      type: ArtworkType.Shape,
      name: ShapeName.BorgoIcon
    },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.HeadquarterAttack, modifier: 1 },
      { slot: TileEdge.TopRight, symbol: SymbolType.HeadquarterAttack, modifier: 1 },
      { slot: TileEdge.BottomRight, symbol: SymbolType.HeadquarterAttack, modifier: 1 },
      { slot: TileEdge.Bottom, symbol: SymbolType.HeadquarterAttack, modifier: 1 },
      { slot: TileEdge.BottomLeft, symbol: SymbolType.HeadquarterAttack, modifier: 1 },
      { slot: TileEdge.TopLeft, symbol: SymbolType.HeadquarterAttack, modifier: 1 },
      { slot: TileCorner.TopLeft, symbol: SymbolType.InitiativeAttribute, modifier: 0 },
      { slot: TileCorner.BottomRight, symbol: SymbolType.ModifyInitiativeAttribute, modifier: 1 },
    ]
  },
  {
    type: TileType.Unit,
    name: "Mutant",
    colors: { primary: "#30c2ff", secondary: "#1a406b", tertiary: "#0578fa" },
    artwork: {
      type: ArtworkType.Biptmap,
      name: "borgo_mutant" 
    },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.Attack, modifier: 1 },
      { slot: TileEdge.TopLeft, symbol: SymbolType.Attack, modifier: 1 },
      { slot: TileEdge.TopRight, symbol: SymbolType.Attack, modifier: 1 },
      { slot: TileCorner.Left, symbol: SymbolType.InitiativeAttribute, modifier: 2 }
    ]
  },
  {
    type: TileType.Unit,
    name: "Claws",
    colors: { primary: "#30c2ff", secondary: "#1a406b", tertiary: "#0578fa" },
    artwork: {
      type: ArtworkType.Biptmap,
      name: "borgo_claws" 
    },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.Attack, modifier: 1 },
      { slot: TileEdge.TopLeft, symbol: SymbolType.Attack, modifier: 1 },
      { slot: TileCorner.BottomRight, symbol: SymbolType.InitiativeAttribute, modifier: 3 }
    ]
  },
  {
    type: TileType.Unit,
    name: "Super mutant",
    colors: { primary: "#30c2ff", secondary: "#1a406b", tertiary: "#0578fa" },
    artwork: {
      type: ArtworkType.Biptmap,
      name: "borgo_supermutant" 
    },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.Armor },
      { slot: TileEdge.TopLeft, symbol: SymbolType.Armor },
      { slot: TileEdge.TopRight, symbol: SymbolType.Armor },
      { slot: TileEdge.Top, symbol: SymbolType.Attack, modifier: 2 },
      { slot: TileEdge.TopLeft, symbol: SymbolType.Attack, modifier: 1 },
      { slot: TileEdge.TopRight, symbol: SymbolType.Attack, modifier: 1 },
      { slot: TileCorner.BottomLeft, symbol: SymbolType.InitiativeAttribute, modifier: 2 },
      { slot: TileCorner.BottomRight, symbol: SymbolType.ToughnessAttribute, modifier: 1 },
    ]
  },
  {
    type: TileType.Unit,
    name: "Net fighter",
    colors: { primary: "#30c2ff", secondary: "#1a406b", tertiary: "#0578fa" },
    artwork: {
      type: ArtworkType.Biptmap,
      name: "borgo_netfighter" 
    },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.Net },
      { slot: TileEdge.Top, symbol: SymbolType.Attack, modifier: 3 },
      { slot: TileCorner.BottomLeft, symbol: SymbolType.InitiativeAttribute, modifier: 1 },
    ]
  },
  {
    type: TileType.Unit,
    name: "Brawler",
    colors: { primary: "#30c2ff", secondary: "#1a406b", tertiary: "#0578fa" },
    artwork: {
      type: ArtworkType.Biptmap,
      name: "borgo_brawler" 
    },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.Attack, modifier: 2 },
      { slot: TileCorner.BottomLeft, symbol: SymbolType.InitiativeAttribute, modifier: 2 },
    ]
  },
  {
    type: TileType.Unit,
    name: "Assasin",
    colors: { primary: "#30c2ff", secondary: "#1a406b", tertiary: "#0578fa" },
    artwork: {
      type: ArtworkType.Biptmap,
      name: "borgo_assasin" 
    },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.RangedAttack, modifier: 1 },
      { slot: TileCorner.TopRight, symbol: SymbolType.InitiativeAttribute, modifier: 3 },
      { slot: TileCorner.BottomRight, symbol: SymbolType.MoveAbility, modifier: 1 },
    ]
  },
  {
    type: TileType.Module,
    name: "Medic",
    colors: { primary: "#30c2ff", secondary: "#1a406b", tertiary: "#0578fa" },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.ModuleConnector },
      { slot: TileEdge.TopLeft, symbol: SymbolType.ModuleConnector },
      { slot: TileEdge.TopRight, symbol: SymbolType.ModuleConnector },
      { slot: TileInner.Center, symbol: SymbolType.ModifyToughnessAttribute, modifier: 1 },
      { slot: TileCorner.BottomRight, symbol: SymbolType.ConstantInitiative, modifier: 1 },
    ]
  },
  {
    type: TileType.Module,
    name: "officer",
    colors: { primary: "#30c2ff", secondary: "#1a406b", tertiary: "#0578fa" },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.ModuleConnector },
      { slot: TileEdge.TopLeft, symbol: SymbolType.ModuleConnector },
      { slot: TileEdge.TopRight, symbol: SymbolType.ModuleConnector },
      { slot: TileInner.Center, symbol: SymbolType.ModifyAttackStrength, modifier: 1 },
      { slot: TileCorner.BottomRight, symbol: SymbolType.ConstantInitiative, modifier: 1 },
    ]
  },
  {
    type: TileType.Module,
    name: "super officer",
    colors: { primary: "#30c2ff", secondary: "#1a406b", tertiary: "#0578fa" },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.ModuleConnector, modifier: 1 },
      { slot: TileEdge.TopLeft, symbol: SymbolType.ModuleConnector, modifier: 1 },
      { slot: TileEdge.TopRight, symbol: SymbolType.ModuleConnector, modifier: 1 },
      { slot: TileInner.Center, symbol: SymbolType.ModifyAttackStrength, modifier: 1 },
      { slot: TileCorner.BottomRight, symbol: SymbolType.ToughnessAttribute, modifier: 1 },
      { slot: TileCorner.BottomLeft, symbol: SymbolType.ConstantInitiative, modifier: 1 }
    ]
  },
  {
    type: TileType.Module,
    name: "scout",
    colors: { primary: "#30c2ff", secondary: "#1a406b", tertiary: "#0578fa" },
    slots: [
      { slot: TileEdge.Top, symbol: SymbolType.ModuleConnector, modifier: 1 },
      { slot: TileEdge.TopLeft, symbol: SymbolType.ModuleConnector, modifier: 1 },
      { slot: TileEdge.TopRight, symbol: SymbolType.ModuleConnector, modifier: 1 },
      { slot: TileInner.Center, symbol: SymbolType.ModifyInitiativeAttribute, modifier: 1 },
      { slot: TileCorner.BottomRight, symbol: SymbolType.ConstantInitiative, modifier: 1 }
    ]
  },
  {
    type: TileType.Action,
    name: "Battle",
    colors: { primary: "#30c2ff", secondary: "#1a406b", tertiary: "#0578fa" },
    artwork: {
      type: ArtworkType.Shape,
      name: ShapeName.Battle
    },
  },
  {
    type: TileType.Action,
    name: "Move",
    colors: { primary: "#30c2ff", secondary: "#1a406b", tertiary: "#0578fa" },
    artwork: {
      type: ArtworkType.Shape,
      name: ShapeName.Move
    },
  },
  {
    type: TileType.Action,
    name: "Granade",
    colors: { primary: "#30c2ff", secondary: "#1a406b", tertiary: "#0578fa" },
    artwork: {
      type: ArtworkType.Shape,
      name: ShapeName.Granade
    },
  }
]