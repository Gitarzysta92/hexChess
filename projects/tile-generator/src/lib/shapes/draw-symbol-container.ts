import { primaryColor, secondaryColor } from "../constants/common";
import { cog, connector } from "../constants/shapes";

export function drawSymbolContainer(
  ctx: CanvasRenderingContext2D,
  size: number,
  modifier: number = 0
): void {
  ctx.fillStyle = primaryColor;
  ctx.ellipse(size * 0.4, 0, size * 0.2, size * 0.2, 0, 0, 2 * Math.PI);
  ctx.fill();

  ctx.translate(size * 0.31, -size * 0.62);
  ctx.scale(size * 0.004, size * 0.003);
  ctx.fillStyle = secondaryColor;
  ctx.fill(connector);
  
  // Back to slot position and rotation
  ctx.restore();

  ctx.translate(size * 0.43, -size * 0.73);
  ctx.scale(size * 0.003, size * 0.003);
  ctx.fillStyle = secondaryColor;
  ctx.fill(cog);
}