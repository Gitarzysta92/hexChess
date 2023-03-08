import { SymbolType } from "../constants/symbol-type";
import { TileCorner } from "../constants/tile-corner";
import { TileEdge } from "../constants/tile-edge";
import { TileColors } from "../interfaces/tile-colors";
import { TileSymbolDeclaration } from "../interfaces/tile-symbol-declaration";
import { drawArmor } from "../shapes/draw-armor";
import { drawAttack } from "../shapes/draw-attack";
import { drawAttackModifier } from "../shapes/draw-attack-modifer";
import { drawHeadquarterAttack } from "../shapes/draw-headquarter-attack";
import { drawHourglass } from "../shapes/draw-hourglass";
import { drawModuleConnector } from "../shapes/draw-module-connector";
import { drawMoveModifier } from "../shapes/draw-move-modifier";
import { drawNet } from "../shapes/draw-net";
import { drawRangedAttack } from "../shapes/draw-ranged-attack";
import { drawSymbolContainer } from "../shapes/draw-symbol-container";
import { drawText } from "../shapes/draw-text";
import { moveToCornerChildSlot } from "../slots/move-to-corner-child-slot";
import { moveToCornerSlot } from "../slots/move-to-corner-slot";
import { moveToEdgeSlot } from "../slots/move-to-edge-slot";

export function drawTileSymbol(
  ctx: CanvasRenderingContext2D,
  size: number,
  declaration: TileSymbolDeclaration<TileEdge | TileCorner>,
  otherDeclarations: TileSymbolDeclaration<TileEdge | TileCorner>[],
  colors: TileColors
): void {

  if (Object.values(TileEdge).includes(declaration.slot as TileEdge)) {
    moveToEdgeSlot(ctx, declaration.slot as TileEdge, size);
  } else if (Object.values(TileCorner).includes(declaration.slot as TileCorner)) {
    moveToCornerSlot(ctx, declaration.slot as TileCorner, size);
  } else {
    return;
  }

  ctx.save();

  switch (declaration.symbol) {
    case SymbolType.HeadquarterAttack:
      drawHeadquarterAttack(ctx, size, colors, declaration.modifier);
      break;

    case SymbolType.Attack:
      drawAttack(ctx, size, declaration.modifier);
      break;
    
    case SymbolType.RangedAttack:
      const rangedAttackOverlapingWithMeleeAttack = otherDeclarations?.find(od =>
        od.slot === declaration.slot && od.symbol === SymbolType.Attack)
      if (rangedAttackOverlapingWithMeleeAttack) {
        ctx.translate(size * 0.20, 0);
      } 
      drawRangedAttack(ctx, size, declaration.modifier);
      break;
    
    case SymbolType.Armor:
      drawArmor(ctx, size)
      break;
    
    case SymbolType.Net:
      drawNet(ctx, size);
      break;
    
    case SymbolType.InitiativeAttribute:
      drawSymbolContainer(ctx, size);
      ctx.restore();
      moveToCornerChildSlot(ctx, declaration.slot as TileCorner, size);
      drawText(ctx, size, `${declaration.modifier}`);
      break;
    
    case SymbolType.ToughnessAttribute:
      drawSymbolContainer(ctx, size);
      ctx.restore();
      moveToCornerChildSlot(ctx, declaration.slot as TileCorner, size);
      ctx.translate(-size * 0.1, -size * 0.16);
      drawText(ctx, size * 1.5, "+");
      break;
    
    case SymbolType.ModifyAttackStrength:
      drawSymbolContainer(ctx, size);
      ctx.restore();
      moveToCornerChildSlot(ctx, declaration.slot as TileCorner, size);
      drawAttackModifier(ctx, size);
      break;

    case SymbolType.MoveAbility:
      drawSymbolContainer(ctx, size);
      ctx.restore();
      moveToCornerChildSlot(ctx, declaration.slot as TileCorner, size);
      drawMoveModifier(ctx, size);
      break;
    
    case SymbolType.ModuleConnector:
      drawModuleConnector(ctx, size);
      break;
    
    case SymbolType.ConstantInitiative:
      drawSymbolContainer(ctx, size);
      ctx.restore();
      moveToCornerChildSlot(ctx, declaration.slot as TileCorner, size);
      drawHourglass(ctx, size);
      break;
      
    default:
      break;
  }
}
