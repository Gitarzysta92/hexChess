import { primaryColor, secondaryColor } from "../constants/common";
import { arrowLong, arrowShort, cog, move } from "../constants/shapes";
import { SymbolType } from "../constants/symbol-type";
import { TileInner } from "../constants/tile-inner";
import { TileColors } from "../interfaces/tile-colors";
import { TileSymbolDeclaration } from "../interfaces/tile-symbol-declaration";
import { drawText } from "../shapes/draw-text";
import { moveToCenterSlot } from "../slots/move-to-center-slot";

export function drawModuleCenter(
  ctx: CanvasRenderingContext2D,
  size: number,
  declarations: TileSymbolDeclaration<TileInner>[],
  colors: TileColors
): void {
  declarations = declarations.filter(d => Object.values(TileInner).includes(d.slot as TileInner));
  moveToCenterSlot(ctx, size);
  
  ctx.beginPath();
  ctx.ellipse(size * 0.025, size * 0.02, size * 0.5, size * 0.5, 0, 0, 2 * Math.PI);
  ctx.fillStyle = primaryColor;
  ctx.strokeStyle = secondaryColor;
  ctx.lineWidth = size * 0.03;
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.save();

  if (declarations.length === 1) {
    drawModuleModifier(ctx, size, declarations[0]);
  } else {
    declarations.forEach((d, i) => {
      ctx.translate(0, -(size * 0.3) + size * (1.5 - i) * 0.35);
      drawModuleModifier(ctx, size * 0.5, d);
      ctx.restore();
    });
  }
}



function drawModuleModifier(
  ctx: CanvasRenderingContext2D,
  size: number,
  declaration: TileSymbolDeclaration<TileInner>
) {
  switch (declaration.symbol) {
    case SymbolType.ModifyMoveAbility:
      ctx.translate(-size * 0.2, -size * 0.7);
      ctx.scale(size * 0.002, size * 0.002);
      ctx.fill(move);
      break;
    
    case SymbolType.ModifyAttackStrength:
      ctx.translate(-size * 0.38, -size * 0.65);
      ctx.scale(size * 0.008, size * 0.008);
      ctx.fill(arrowShort);
      break;
    
    case SymbolType.ModifyInitiativeAttribute:
      ctx.save();
      ctx.translate(size * 0.055, -size * 0.95);
      ctx.scale(size * 0.004, size * 0.004);
      ctx.fill(cog);
      ctx.restore();
      ctx.translate(-size * 0.25, -size * 0.40)
      drawText(ctx, size * 1.2, `${declaration.modifier}`)
      break;
    
    case SymbolType.SwapAttack:
      ctx.save();
      ctx.translate(-size * 0.35, -size * 0.35);
      ctx.scale(size * 0.0052, size * 0.0052);
      ctx.translate(-size * 0.1, 0);
      ctx.fill(arrowShort);
      ctx.restore();
      ctx.translate(-size * 0.12, -size * 0.3);
      drawText(ctx, size, "=");
      ctx.restore();
      ctx.translate(size * 0.1, -size * 0.4);
      ctx.scale(size * 0.003, size * 0.004);
      ctx.translate(size * 0.1, size * 0.28);
      ctx.fill(arrowLong);
      break;
    
    case SymbolType.ModifyToughnessAttribute:
      ctx.save();
      ctx.translate(-size * 0.6, -size * 1.05);
      drawText(ctx, size * 3, "+")
      break;
  
    default:
      break;
  }

}