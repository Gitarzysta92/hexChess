import { fontType, secondaryColor } from "../constants/common";

export function drawText(
  ctx: CanvasRenderingContext2D,
  size: number,
  text: string,
): void {
  const fontSize = Math.round(size * 0.20);
  ctx.font = `${fontSize}px ${fontType}`;
  ctx.fillStyle = secondaryColor;
  ctx.fillText(text, size * 0.15, size * 0.42);
}