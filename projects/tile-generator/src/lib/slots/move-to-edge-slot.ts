import { TileEdge } from "../constants/tile-edge";
import { resetCanvas } from "../helpers/helpers";

export function moveToEdgeSlot(
  ctx: CanvasRenderingContext2D,
  edge: TileEdge,
  size: number
): void {
  resetCanvas(ctx);

  switch (edge) {
    case TileEdge.Top:
      ctx.translate(size, size * 0.13);
      break;
    
    case TileEdge.TopRight:
      ctx.translate(size * 1.75, size * 0.55);
      ctx.rotate(60 * Math.PI / 180);
      break;
    
    case TileEdge.BottomRight:
      ctx.translate(size * 1.75, size * 1.45);
      ctx.rotate(120 * Math.PI / 180);
      break;
    
    case TileEdge.Bottom:
      ctx.rotate(180 * Math.PI / 180);
      ctx.translate(-size, -size * 1.86);
      break;
    
    case TileEdge.BottomLeft:
      ctx.translate(size * 0.26, size * 1.45);
      ctx.rotate(240 * Math.PI / 180);
      break;
    
    case TileEdge.TopLeft:
      ctx.translate(size * 0.25, size * 0.55);
      ctx.rotate(-60 * Math.PI / 180);
      break;
  
    default:
      break;
  }

  // ctx.fillStyle = "red";
  // ctx.fillRect(0, 0, 5, 5);
}