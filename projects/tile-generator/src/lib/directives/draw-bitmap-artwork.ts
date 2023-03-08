import { moveToCenterSlot } from "../slots/move-to-center-slot";

export function drawBitmapArtwork(
  ctx: CanvasRenderingContext2D,
  size: number,
  img: ImageBitmap
): void {
  moveToCenterSlot(ctx, size);
  ctx.translate(-size * 0.75, -size * 0.3)
  ctx.scale(size * 0.001, size * 0.001)
  ctx.drawImage(img, 0,0);
}