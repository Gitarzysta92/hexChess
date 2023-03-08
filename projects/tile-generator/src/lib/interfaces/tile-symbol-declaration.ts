import { SymbolType } from "../constants/symbol-type";

export interface TileSymbolDeclaration<T> {
  slot: T;
  symbol: SymbolType;
  modifier?: number;
}