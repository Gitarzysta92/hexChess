import { secondaryColor } from "../constants/common";
import { hourglass } from "../constants/shapes";


export function drawHourglass(
  ctx: CanvasRenderingContext2D,
  size: number,
): void {
  const scale = size * 0.0005;
  ctx.translate(size * 0.2, size * 0.2);
  ctx.scale(scale, scale);
  ctx.fillStyle = secondaryColor;
  ctx.fill(hourglass);

}