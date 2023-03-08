import { resetCanvas } from "../helpers/helpers";

export function moveToCenterSlot(
  ctx: CanvasRenderingContext2D,
  size: number
): void {
  resetCanvas(ctx);
  ctx.translate(size - 2.5, size - 2.5);
  ctx.save();
  // ctx.fillStyle = "red";
  // ctx.fillRect(0, 0, 5, 5);
}