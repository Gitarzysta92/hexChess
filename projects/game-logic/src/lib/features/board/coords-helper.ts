import { Direction } from "./constants/tile-sides";
import { Coord } from "./interfaces/coords";

export class CoordsHelper {

  static createHexagonalBoardCoords(diameter: number): Coord[] {
    const radius = (diameter - 1) / 2;

    const coords = [];
    let offset = 0;
    for (let r = -radius; r <= radius; r++) {
      for (let q = offset; q < diameter - Math.abs(r) - Math.abs(offset); q++) {
        coords.push({ r, q, s: (r + q) * -1 })
      }
      if (offset + radius !== 0)
        offset--
    }
    return coords;
  }

  static getCircleOfCoords(cc: Coord, radius: number): Coord[] {
    const coords: Coord[] = [{ r: cc.r - radius, q: cc.q, s: cc.s + radius }];
    let n = 6 * radius;
    let i = radius;

    const steps = [
      this.getAdjencedTopCoords,
      this.getAdjencedTopRightCoords,
      this.getAdjencedBottomRightCoords,
      this.getAdjencedBottomCoords,
      this.getAdjencedBottomLeftCoords,
      this.getAdjencedTopLeftCoords
    ];

    while (n !== 0) {
      if (i === 0) {
        steps.shift();
        i = radius;
      } 
      coords.unshift(steps[0](coords[0]));
      n--;
      i--;
    }
    coords.pop();
    return coords;
  }

  static getAllCoordsForGivenSide(from: Coord, side: Direction, board: Coord[]): Coord[] {
    let method;

    switch (side) {
      case Direction.Top:
        method = this.getAdjencedTopCoords
        break;
      case Direction.TopRight:
        method = this.getAdjencedTopRightCoords
        break;
      case Direction.TopLeft:
        method = this.getAdjencedTopLeftCoords
        break;
      case Direction.Bottom:
        method = this.getAdjencedBottomCoords
        break;
      case Direction.BottomLeft:
        method = this.getAdjencedBottomLeftCoords
        break;
      case Direction.BottomRight:
        method = this.getAdjencedBottomRightCoords
        break;
    }

    const coords = [];
    let prevCoords = from;
    while (prevCoords !== null) {
      const coord = method(prevCoords);
      if (board.some(f => f.q === coord.q && f.r === coord.r && f.s === coord.s)) {
        coords.push(coord);
        prevCoords = coord;
      } else {
        prevCoords = null as any;
      }
        
    }
    return coords;
  }

  static getAdjencedTopCoords(cc: Coord): Coord {
    return { r: cc.r, q: cc.q + 1, s: cc.s - 1 }
  }

  static getAdjencedTopRightCoords(cc: Coord): Coord {
    return { r: cc.r + 1, q: cc.q, s: cc.s - 1 }
  }

  static getAdjencedTopLeftCoords(cc: Coord): Coord {
    return { r: cc.r - 1, q: cc.q + 1, s: cc.s }
  }

  static getAdjencedBottomCoords(cc: Coord): Coord {
    return { r: cc.r, q: cc.q - 1, s: cc.s + 1 }
  }

  static getAdjencedBottomLeftCoords(cc: Coord): Coord {
    return { r: cc.r - 1, q: cc.q, s: cc.s + 1 }
  }

  static getAdjencedBottomRightCoords(cc: Coord): Coord {
    return { r: cc.r + 1, q: cc.q - 1, s: cc.s }
  }


  static sortCoordsByRows(coords: Coord[]): Coord[][] {
    const cCopy = [...coords];
    const sorted = cCopy.sort((a, b) => a.r - b.r);
  
    let currentRow: number | undefined;
    const coordsInRows: Coord[][] = [];
  
    sorted.forEach(c => {
      if (currentRow !== c.r) {
        coordsInRows[coordsInRows.length - 1]?.sort((a, b) => a.q - b.q)
        coordsInRows.push([]);
        currentRow = c.r;
      }
      coordsInRows[coordsInRows.length - 1].push(c);
    });
  
    return coordsInRows;
  }

  static mirrorCoordsBy(key: string, coords: Coord[]): Coord[] {
    return coords.map(c => {
      const cCopy = Object.assign({}, c);
      for (let cKey in cCopy) {
        if (cKey === key)
          continue;
        (cCopy as any)[cKey] *= -1;
      }
      return cCopy;
    })
  }
  

}