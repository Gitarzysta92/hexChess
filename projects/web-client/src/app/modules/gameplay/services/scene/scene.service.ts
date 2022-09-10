import { Injectable } from "@angular/core";
import { init, Scene } from "hexchess-3d-scene";
import { GameView } from "hexchess-3d-scene/dist/core/game-view";

@Injectable()
export class SceneService {

  scene: Scene;
  view: GameView;

  constructor() { 
    this.scene = init();
  }


  public createScene(nativeElement: HTMLElement, coords: any[]): GameView {
    this.view = this.scene.createScene(nativeElement, coords);
    return this.view;
  }

  public adjustRendererSize() {
    this.view.adjustRendererSize();
  }
}