import { ArtworkType } from "./constants/artwork-type";
import { primaryColor } from "./constants/common";
import { ShapeName } from "./constants/shape-name";
import { SymbolType } from "./constants/symbol-type";
import { TileCorner } from "./constants/tile-corner";
import { TileEdge } from "./constants/tile-edge";
import { TileInner } from "./constants/tile-inner";
import { TileType } from "./constants/tile-type";
import { drawBitmapArtwork } from "./directives/draw-bitmap-artwork";
import { drawHeadquarterCenter } from "./directives/draw-headquarter-center";
import { drawModuleCenter } from "./directives/draw-module-center";
import { drawShapeArtwork } from "./directives/draw-shape-artwork";
import { drawTileBase } from "./directives/draw-tile-base";
import { drawTileMask } from "./directives/draw-tile-outline";
import { drawTileSymbol } from "./directives/draw-tile-symbol";
import { resetCanvas } from "./helpers/helpers";
import { TileGeneratorConfig } from "./interfaces/tile-generator-config";
import { TileGraphicalConfig } from "./interfaces/tile-graphical-config";
import { TileSymbolDeclaration } from "./interfaces/tile-symbol-declaration";
import { drawCenterRing } from "./shapes/draw-center-ring";
import { moveToCenterSlot } from "./slots/move-to-center-slot";

export class TileGenerator {

  public ctx: CanvasRenderingContext2D;
  private _canvas: HTMLCanvasElement;
  private _tileSize: number;

  constructor(cfg: TileGeneratorConfig) {
    this._canvas = document.createElement('canvas');
    this._canvas.width = cfg.tileSize * 2.2;
    this._canvas.height = cfg.tileSize * 2.2;
    this._tileSize = cfg.tileSize;
    this.ctx = this._canvas.getContext("2d")!;
    (this.ctx as any).tileSize = this._tileSize;
  }

  generate(cfg: TileGraphicalConfig, feed: any): string {
    resetCanvas(this.ctx);

    this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    drawTileMask(this.ctx, this._tileSize);

    if (cfg.type === TileType.Module) {
      this._drawModuleTile(cfg);
    } else if(cfg.type === TileType.Action) {
      this._drawActionTile(cfg);
    } else {
      if (cfg.type === TileType.Headquarter) {
        drawTileBase(this.ctx, this._tileSize, { primary: primaryColor, secondary: primaryColor, tertiary: primaryColor });
      } else {
        drawTileBase(this.ctx, this._tileSize, cfg.colors)
      }
      
      if (cfg.type === TileType.Headquarter) {
        drawHeadquarterCenter(this.ctx, cfg.artwork?.name as ShapeName, this._tileSize, cfg.colors);
      } else if (cfg.artwork?.type === ArtworkType.Shape) {
        drawShapeArtwork(this.ctx, this._tileSize, cfg.artwork.name! as ShapeName, cfg.colors);
      } else if (cfg.artwork?.type === ArtworkType.Biptmap) {
        drawBitmapArtwork(this.ctx, this._tileSize, feed.artwork);
      }
  
      cfg.slots?.forEach(slot =>
        drawTileSymbol(
          this.ctx,
          this._tileSize,
          slot as TileSymbolDeclaration<TileEdge | TileCorner>,
          cfg.slots! as TileSymbolDeclaration<TileEdge | TileCorner>[],
          cfg.colors
        ));
    }

    resetCanvas(this.ctx);

    if (feed.shift) {
      this.ctx.translate(feed.shift.x, feed.shift.y);
    }


    return this._canvas.toDataURL('image/png');
  }

  private _drawUnitTile(cfg: TileGraphicalConfig): void {

  }

  private _drawModuleTile(cfg: TileGraphicalConfig): void {
    drawTileBase(this.ctx, this._tileSize, cfg.colors);
    this.ctx.save();
    moveToCenterSlot(this.ctx, this._tileSize);
    drawCenterRing(this.ctx, this._tileSize);
    this.ctx.restore();

    cfg.slots?.filter(s => s.symbol === SymbolType.ModuleConnector)
      .forEach(slot =>
      drawTileSymbol(
        this.ctx,
        this._tileSize,
        slot as TileSymbolDeclaration<TileEdge | TileCorner>,
        cfg.slots! as TileSymbolDeclaration<TileEdge | TileCorner>[],
        cfg.colors
      ));
    
    drawModuleCenter(this.ctx, this._tileSize, cfg.slots as TileSymbolDeclaration<TileInner>[], cfg.colors);

    cfg.slots?.filter(s => s.symbol !== SymbolType.ModuleConnector)
      .forEach(slot =>
      drawTileSymbol(
        this.ctx,
        this._tileSize,
        slot as TileSymbolDeclaration<TileEdge | TileCorner>,
        cfg.slots! as TileSymbolDeclaration<TileEdge | TileCorner>[],
        cfg.colors
      ));
  }

  private _drawActionTile(cfg: TileGraphicalConfig): void {
    drawTileBase(this.ctx, this._tileSize, { primary: primaryColor, secondary: primaryColor, tertiary: primaryColor });
    moveToCenterSlot(this.ctx, this._tileSize);
    this.ctx.save();
    drawShapeArtwork(this.ctx, this._tileSize, cfg.artwork?.name! as ShapeName, cfg.colors);
  }
}