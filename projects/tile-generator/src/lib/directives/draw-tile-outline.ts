import { drawHexagon } from "../shapes/draw-hexagon";

export function drawTileMask(
  ctx: CanvasRenderingContext2D,
  size: number
): void {
  drawHexagon(ctx, size);
  ctx.clip();
}