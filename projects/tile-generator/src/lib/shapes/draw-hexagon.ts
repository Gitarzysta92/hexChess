import { resetCanvas } from "../helpers/helpers";

export function drawHexagon(
  ctx: CanvasRenderingContext2D,
  size: number
) {
  const x = size, y = size;
  let side = 0;
  ctx.beginPath();
  ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
  for (side; side < 7; side++) {
    ctx.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
  }
}