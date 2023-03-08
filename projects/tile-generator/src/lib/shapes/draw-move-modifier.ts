import { move } from "../constants/shapes";

export function drawMoveModifier(
  ctx: CanvasRenderingContext2D,
  size: number,
  modifier: number = 1
): void {
  const scale = size * 0.0005;
  ctx.translate(size * 0.15, size * 0.18);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#fff";
  ctx.fill(move);

}