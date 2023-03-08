import { ArtworkType } from "../lib/constants/artwork-type";
import { resetCanvas } from "../lib/helpers/helpers";
import { TileGraphicalConfig } from "../lib/interfaces/tile-graphical-config";
import { drawHexagon } from "../lib/shapes/draw-hexagon";
import { TileGenerator } from "../lib/tile-generator";
import { borgo } from "./demo-data/borgo";
import { hegemony } from "./demo-data/hegemony";

const tiles = [...hegemony, ...borgo];
const tileSize = 150;
const tileGenerator = new TileGenerator({ tileSize });
const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = calculateCanvasHeight();
document.body.appendChild(canvas);



generateTiles(tiles);


async function generateTiles(tiles: TileGraphicalConfig[]) {
  let x = 0;
  let y = 0;
  for (let tile of tiles) {
    let image;

    if (tile.artwork?.type === ArtworkType.Biptmap) {
      image = await getImage(`assets/${tile.artwork?.name}.png` as string);
    }


    const tileGraphicUrl = tileGenerator.generate(tile, { artwork: image, shift: {x: 100, y: 0} });
    drawImageOnCanvas(tileGraphicUrl, x, y);
    x++
    if (x === 3) {
      x = 0;
      y++;
    }
  }
}

function drawImageOnCanvas(imageUrl: string, x: number, y: number) {  
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.src = imageUrl;
  const m = 2.3;
  img.onload = function () {
    resetCanvas(ctx!)
    ctx!.translate(22, 20)
    ctx!.translate(x * tileSize * m, y * tileSize * m);
    ctx!.translate(-20, -20)
    drawHexagon(ctx!, tileSize + 20);
    ctx!.fillStyle = "#000";
    ctx!.fill();
    resetCanvas(ctx!)
    ctx!.translate(20, 20)
    ctx?.drawImage(img, x * tileSize * m, y * tileSize * m);
  }
}

function calculateCanvasHeight(): number {
  const n = tiles.length;
  return (Math.round(n / 3 * (tileSize * 2)) + tileSize) + (Math.round(n/3) * 60)
}



async function getImage(src: string): Promise<HTMLImageElement> {
  let img = new Image();
  await new Promise(r => (img.onload = r, img.src = src));
  return img;
}
