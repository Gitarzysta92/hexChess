import { UnitTile } from "../../../lib/features/army/models/unit-tile";
import { battleResolver } from "../../../lib/features/battle/mutators/battle-resolver";

describe('battle-resolver', () => {
  
  it('should be resolved without ambiguities and single initiative stage', () => {
    const tile = generateTile()
    const board = generateBoard([tile, tile]);

    const r = battleResolver(board, {});
    const { value: boardResults } = r.next();
    expect(boardResults.resolved).toEqual(true);
    expect(boardResults.initiativeStages[0].tiles.length).toEqual(2);
    expect(boardResults.amibiguities.length).toEqual(0);
  });


  it('should be resolved with ambiguities and single initiative stage', () => {
    const tile = generateTile();
    tile.checkAmbiguity = () => true;
    const board = generateBoard([tile, tile]);

    const r = battleResolver(board, {});
    let boardResults = r.next().value;
    expect(boardResults.resolved).toBeFalsy();
    expect(boardResults.initiativeStages.length).toEqual(0);
    expect(boardResults.amibiguities.length).toBeGreaterThan(0);

    boardResults = r.next().value;
    expect(boardResults.resolved).toEqual(true);
    expect(boardResults.initiativeStages[0].tiles.length).toEqual(2);
    expect(boardResults.amibiguities.length).toEqual(0);
  });


  it('should be resolved with all tiles removed', () => {
    const tile = generateTile();
    tile.attack = function() { (this as any).health -= 1};
    const board = generateBoard([tile, tile]);

    const r = battleResolver(board, {});
    const { value: boardResults } = r.next();
    expect(boardResults.resolved).toEqual(true);
    expect(boardResults.initiativeStages.length).toEqual(1);
    expect(boardResults.initiativeStages.pop().length).toEqual(0);
    expect(boardResults.amibiguities.length).toEqual(0);
  });


  it('should be resolved with one tile removed in second initiative and one left', () => {
    const tile = generateTile();
    const tile2 = generateTile();
    tile2.attack = function () { (tile as any).health -= 1 };
    (tile2 as any).initiative = 2;
    const board = generateBoard([tile, tile2]);

    const r = battleResolver(board, {});
    const { value: boardResults } = r.next();

    expect(boardResults.resolved).toEqual(true);
    expect(boardResults.initiativeStages.length).toEqual(2);
    expect(boardResults.initiativeStages[0].length).toEqual(1);
    expect(boardResults.initiativeStages[1].length).toEqual(1);
    expect(boardResults.amibiguities.length).toEqual(0);
  });
              
});



export function generateTile(): UnitTile & { baseInitiative: number, initiative: number, health: number } & any {
  return {
    id: '',
    name: '',
    initiative: 1,
    baseInitiative: 1,
    health: 1,
    get thoughness() { return this.health - 1 },
    attack: () => null as any,
    checkAmbiguity: () => null as any
  }
}

export function generateBoard(tiles: any[]): any {
  return {
    _tiles: tiles,
    get length() { return this.tiles.length },
    get tiles() { return this._tiles },
    copy: function () { return this },
    [Symbol.iterator]: function *() {
      for (let i = 0; i < this.tiles.length; i++) {
        yield this.tiles[i];
      }
    },
    removeTile: function(tile: any) {
      this._tiles = this._tiles.filter((t: any) => t !== tile);
    }
  }
}


