import { net } from "../constants/shapes";


export function drawNet(
  ctx: CanvasRenderingContext2D,
  size: number,
): void {
  ctx.translate(-size * 0.31, -size * 0.4);
  const scale = size * 0.0023;
  ctx.scale(scale, scale);
  //ctx.globalCompositeOperation = "destination-out";
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#fff";
  ctx.stroke(net);
  ctx.fill(net);
}