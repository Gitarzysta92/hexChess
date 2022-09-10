import { Direction } from "./constants/tile-sides";
import { CoordsHelper } from "./coords-helper";
import { Board } from "./interfaces/board";
import { Coord } from "./interfaces/coords";
import { Field } from "./interfaces/field";
import { Tile } from "./models/tile";

export class BoardService implements Board {

  coords!: Coord[];
  fields!: { [key: string]: Field; };

  get fieldsList() { return Object.values(this.fields) }

  constructor(
    private readonly _coordsHelper: typeof CoordsHelper
  ) {}

  initialize(size: number, coords?: Coord[], fields?: { [key: string]: Field; }): this {
    if (coords && fields) {
      this.coords = coords;
      this.fields = fields;
    } else {
      this.coords = this._coordsHelper.createHexagonalBoardCoords(size);
      this.fields = {};
      this.coords.forEach(c => {
        this.fields[this._getFieldKey(c)] = {} as Field;
      });
    }
    return this;
  }

  assingdTile(tile: Tile, coord: Coord): void {
    if (this.isFieldOccupied(coord)) {
      throw new Error(`Cannot assing to field: ${JSON.stringify(coord)}. Field is already occupied.`)
    }

    this.fields[this._getFieldKey(coord)].tile = tile;
  }

  removeTile(coord: Coord): void {
    if (this.fields[this._getFieldKey(coord)]?.tile) {
      this.fields[this._getFieldKey(coord)].tile = null;
    }
  }

  getFields(coords: Coord[]): Field[] {
    return coords.map(c => this.fields[this._getFieldKey(c)])
      .filter(f => !!f);
  }

  isFieldOccupied(coord: Coord): boolean {
    return !!this.fields[this._getFieldKey(coord)]?.tile
  }


  private _getFieldKey(coord: Coord): string {
    return `${coord.q}${coord.r}${coord.s}`
  }
}