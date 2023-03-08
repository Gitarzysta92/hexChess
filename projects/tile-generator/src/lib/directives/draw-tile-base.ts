import { secondaryColor } from "../constants/common";
import { TileColors } from "../interfaces/tile-colors";
import { drawHexagon } from "../shapes/draw-hexagon";

export function drawTileBase(
  ctx: CanvasRenderingContext2D,
  size: number,
  colors: TileColors
) {
  ctx.lineWidth = size * 0.06;
  ctx.strokeStyle = secondaryColor;
  drawHexagon(ctx, size);
  var grd = ctx.createRadialGradient(size, size, size/5, size, size, size * 1.2); 
  grd.addColorStop(0, colors.primary);
  grd.addColorStop(1, colors.secondary);
  ctx.fillStyle = grd;
  ctx.fill();
  ctx.stroke();
}