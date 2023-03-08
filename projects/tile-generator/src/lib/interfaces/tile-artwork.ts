import { ArtworkType } from "../constants/artwork-type";
import { ShapeName } from "../constants/shape-name";

export interface TileArtwork {
  type: ArtworkType;
  name: string | ShapeName;
}