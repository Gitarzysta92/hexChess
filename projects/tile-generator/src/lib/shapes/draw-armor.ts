import { armor } from "../constants/shapes";

export function drawArmor(
  ctx: CanvasRenderingContext2D,
  size: number,
): void {
  ctx.translate(-size * 0.35, -size * 0.4);
  const scale = size * 0.0023;
  ctx.scale(scale, scale);
  ctx.fillStyle = "#fff";
  ctx.fill(armor);
}