import { ShapeName } from "../constants/shape-name";
import { shape } from "../constants/shapes";
import { TileColors } from "../interfaces/tile-colors";
import { drawCenterRing } from "../shapes/draw-center-ring";
import { moveToCenterSlot } from "../slots/move-to-center-slot";

export function drawHeadquarterCenter(
  ctx: CanvasRenderingContext2D,
  shapeName: ShapeName,
  size: number,
  colors: TileColors
): void {
  moveToCenterSlot(ctx, size);
  drawCenterRing(ctx, size);

  ctx.restore();
  ctx.fillStyle = colors.primary;
  ctx.translate(-size * 0.47, -size * 0.47);

  switch (shapeName) {
    case ShapeName.BorgoIcon:
      ctx.translate(0, size * 0.09);
      break;
  
    default:
      break;
  }


  ctx.scale(size * 0.005, size * 0.005);
  ctx.fill((shape as any)[shapeName]);
}