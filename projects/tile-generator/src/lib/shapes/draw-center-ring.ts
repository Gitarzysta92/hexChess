import { secondaryColor } from "../constants/common";
import { invertedCog } from "../constants/shapes";
import { moveToCenterSlot } from "../slots/move-to-center-slot";

export function drawCenterRing(
  ctx: CanvasRenderingContext2D,
  size: number,
) {
  ctx.translate(-size * 0.65, -size * 0.65);
  ctx.scale(size * 0.003, size * 0.003);
  ctx.fillStyle = secondaryColor;
  ctx.fill(invertedCog);
}