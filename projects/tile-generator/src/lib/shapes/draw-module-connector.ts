import { primaryColor, secondaryColor } from "../constants/common";
import { arrowShort } from "../constants/shapes";

export function drawModuleConnector(
  ctx: CanvasRenderingContext2D,
  size: number
): void {
  ctx.fillStyle = secondaryColor;
  ctx.fillRect(-size * 0.235, -size * 0.1, size * 0.47, size * 0.8)
  ctx.fill();

  ctx.fillStyle = primaryColor;
  ctx.fillRect(-size * 0.2, -size * 0.1, size * 0.40, size * 0.8)
  ctx.fill();

  ctx.fillStyle = secondaryColor;
  ctx.fillRect(-size * 0.03, size * 0.2, size * 0.065, size * 0.065)
  ctx.fill();

  ctx.translate(-size * 0.075, -size * 0.070);
  ctx.scale(size * 0.0015, size * 0.0025);
  ctx.fill(arrowShort);
}