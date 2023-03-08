import { meleeAttackBase, meleeAttackStroke } from "../constants/shapes";


export function drawAttack(
  ctx: CanvasRenderingContext2D,
  size: number,
  modifier: number = 1
): void {
  for (let i = modifier; i > 0; i--) {
    ctx.save();
    const shift = -size * 0.4 - ((size * 0.11) * modifier/2)
    ctx.translate(shift, -size * 0.5);
    ctx.translate((size * i) * 0.1, 0);
    const scale = size * 0.008;
    ctx.scale(scale, scale);
    ctx.fillStyle = "#000";
    ctx.fill(meleeAttackBase);
    ctx.fillStyle = "#fff";
    ctx.fill(meleeAttackStroke);
    ctx.restore();
  }


  ctx.restore();

  // ctx.translate(-size * 0.4, -size * 0.5);
  // const scale = size * 0.008;
  // ctx.scale(scale, scale);
  // ctx.fillStyle = "#000";
  // ctx.fill(meleeAttackBase);
  // ctx.fillStyle = "#fff";
  // ctx.fill(meleeAttackStroke);
}