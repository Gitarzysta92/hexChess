import { TileCorner } from "../constants/tile-corner";
import { resetCanvas } from "../helpers/helpers";

export function moveToCornerChildSlot(
  ctx: CanvasRenderingContext2D,
  corner: TileCorner,
  size: number
): void {
  resetCanvas(ctx);
  switch (corner) {
    case TileCorner.TopLeft:
      ctx.translate(size * 0.5, size * 0.13);
      break;
    
    case TileCorner.TopRight:
      ctx.translate(size * 1.09, size * 0.13);
      break;
    
    case TileCorner.Right:
      ctx.translate(size * 1.38, size * 0.65);
      break;
    
    case TileCorner.BottomRight:
      ctx.translate(size * 1.09, size * 1.15);
      break;
    
    case TileCorner.BottomLeft:
      ctx.translate(size * 0.49, size * 1.15);
      break;
    
    case TileCorner.Left:
      ctx.translate(size * 0.19, size * 0.65);
      break;
    
    default:
      break;
  }

  // ctx.fillStyle = "blue";
  // ctx.fillRect(0, 0, 5, 5);
}