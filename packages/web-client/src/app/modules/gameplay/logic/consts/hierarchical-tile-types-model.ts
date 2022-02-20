export enum TileType {
  Unit,
  InstantAction
}

export enum UnitType {
  Headquarter,
  Warrior,
  Module
}

export enum ActionType {
  Targetless,
}


export const TYPE = {
  UNIT: {
    HEADQUARTER: TileType.Unit + UnitType.Headquarter, 
    WARRIOR: TileType.Unit + UnitType.Warrior,
    MODULE: TileType.Unit + UnitType.Module
  },
  INSTANT_ACTION: {
    TARGETLESS: TileType.InstantAction + ActionType.Targetless  
  }
}

TileType.InstantAction