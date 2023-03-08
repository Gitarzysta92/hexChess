import { rangedAttackStroke, rangedAttackBase } from "../constants/shapes";


export function drawRangedAttack(
  ctx: CanvasRenderingContext2D,
  size: number,
  modifier: number = 1
): void {
  ctx.translate(-size * 0.35, -size * 1.65);
  const scale = size * 0.007;
  ctx.scale(scale, scale);
  ctx.fillStyle = "#000";
  ctx.fill(rangedAttackBase);
  ctx.fillStyle = "#fff";
  ctx.fill(rangedAttackStroke);
}