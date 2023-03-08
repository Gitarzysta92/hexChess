import { secondaryColor } from "../constants/common";
import { ShapeName } from "../constants/shape-name";
import { battleInner, battleOuter, granade, move, pushBack, sniperInner, sniperOuter } from "../constants/shapes";
import { TileColors } from "../interfaces/tile-colors";

export function drawShapeArtwork(
  ctx: CanvasRenderingContext2D,
  size: number,
  shapeName: ShapeName,
  colors: TileColors
): void {

  switch (shapeName) {
    case ShapeName.Battle:
      ctx.save();
      ctx.translate(-size * 0.45, -size * 1.35);
      ctx.scale(size * 0.0035, size * 0.0035);
      ctx.fillStyle = colors.primary;
      ctx.fill(battleOuter);
      ctx.restore();
      ctx.translate(-size * 0.1, -size * 0.5);
      ctx.scale(size * 0.0015, size * 0.0015);
      ctx.fillStyle = secondaryColor;
      ctx.fill(battleInner);
      break;
    
    case ShapeName.Move:
      ctx.translate(-size * 0.35, -size * 1.25);
      ctx.scale(size * 0.0035, size * 0.0035);
      ctx.fillStyle = colors.primary;
      ctx.fill(move);
      break;
    
    case ShapeName.Sniper:
      ctx.save();
      ctx.translate(-size * 0.45, -size * 1.35);
      ctx.scale(size * 0.0035, size * 0.0035);
      ctx.fillStyle = colors.primary;
      ctx.fill(sniperOuter);
      ctx.restore();
      ctx.translate(size * 0.07, -size * 0.83);
      ctx.scale(size * 0.0035, size * 0.0035);
      ctx.fillStyle = secondaryColor;
      ctx.fill(sniperInner);
      break;
    
    case ShapeName.Pushback:
      ctx.translate(-size * 0.15, -size * 1.25);
      ctx.scale(size * 0.0035, size * 0.0035);
      ctx.fillStyle = colors.primary;
      ctx.fill(pushBack);
      break;
      
    case ShapeName.Granade:
      ctx.translate(-size * 0.35, -size * 1.20);
      ctx.scale(size * 0.0030, size * 0.0030);
      ctx.fillStyle = colors.primary;
      ctx.fill(granade);
      break;
    
    default:
      break;
  }




  // ctx.restore();
  // ctx.fillStyle = "orange";
  // ctx.fill(hegemonyIcon);
  // ctx.font = "100px Open sans";
  // ctx.fillText("+", 200, 400);
}