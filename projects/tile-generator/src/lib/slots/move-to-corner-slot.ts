import { TileCorner } from "../constants/tile-corner";
import { resetCanvas } from "../helpers/helpers";

export function moveToCornerSlot(
  ctx: CanvasRenderingContext2D,
  corner: TileCorner,
  size: number
): void {
  resetCanvas(ctx);
  switch (corner) {
    case TileCorner.TopLeft:
      ctx.translate(size * 0.5, size * 0.13);
      ctx.save();
      ctx.rotate(60 * Math.PI / 180);
      break;
    
    case TileCorner.TopRight:
      ctx.translate(size * 1.5, size * 0.13);
      ctx.save();
      ctx.rotate(120 * Math.PI / 180);
      break;
    
    case TileCorner.Right:
      ctx.translate(size * 1.99, size);
      ctx.save();
      ctx.rotate(180 * Math.PI / 180);
      break;
    
    case TileCorner.BottomRight:
      ctx.translate(size * 1.5, size * 1.86);
      ctx.save();
      ctx.rotate(240 * Math.PI / 180);
      break;
    
    case TileCorner.BottomLeft:
      ctx.translate(size * 0.5, size * 1.86);
      ctx.save();
      ctx.rotate(300 * Math.PI / 180);
      break;
    
    case TileCorner.Left:
      ctx.translate(0, size);
      ctx.save();
      break;
    
    default:
      break;
  }

  // ctx.fillStyle = "blue";
  // ctx.fillRect(0, 0, 5, 5);
}