export function resetCanvas(ctx: CanvasRenderingContext2D): void {
  ctx.resetTransform();
  if ((ctx as any).tileSize) {
    (ctx as any).tileSize
    ctx.translate((ctx as any).tileSize * 0.1, (ctx as any).tileSize * 0.1);
  }
  ctx.beginPath();
  ctx.moveTo(0, 0);
}