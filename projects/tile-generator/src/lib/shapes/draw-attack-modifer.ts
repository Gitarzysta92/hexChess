import { arrowShort } from "../constants/shapes";

export function drawAttackModifier(
  ctx: CanvasRenderingContext2D,
  size: number,
  modifier: number = 1
): void {
  const scale = size * 0.0022;
  ctx.translate(size * 0.1, size * 0.18);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#fff";
  ctx.fill(arrowShort);

}