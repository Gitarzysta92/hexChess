import { meleeAttackBase, meleeAttackStroke } from "../constants/shapes";
import { TileColors } from "../interfaces/tile-colors";


export function drawHeadquarterAttack(
  ctx: CanvasRenderingContext2D,
  size: number,
  colors: TileColors,
  modifier: number = 1
): void {


  ctx.translate(-size * 0.4, -size * 0.5);
  const scale = size * 0.008;
  ctx.scale(scale, scale);
  ctx.fillStyle = colors.primary;
  ctx.fill(meleeAttackBase);
}