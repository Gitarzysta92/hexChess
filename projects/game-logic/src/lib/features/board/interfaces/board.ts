import { Coord } from "./coords";
import { Field } from "./field";

export interface Board {
  coords: Coord[],
  fields: {
    [key: string]: Field
  }
}