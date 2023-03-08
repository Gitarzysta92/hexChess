import { secondaryColor } from "../constants/common";
import { cog } from "../constants/shapes";
import { drawText } from "./draw-text";

export function drawInitiativeModifier(
  ctx: CanvasRenderingContext2D,
  size: number,
  modifier: number = 1
): void {
  ctx.save();
  const scale = size * 0.0015;
  ctx.scale(scale, scale);
  ctx.fillStyle = secondaryColor;
  ctx.fill(cog);
  ctx.restore();
  ctx.translate(-size * 0.12, size * 0.19)
  drawText(ctx, size * 0.5, `${modifier}`)
}