import { Injectable } from "@angular/core";
import { BoardComponent } from "@hexchess-3d-scene/lib/components/functional/board.component";
import { DialogComponent } from "@hexchess-3d-scene/lib/components/functional/dialog.component";
import { RotateTileControlComponent } from "@hexchess-3d-scene/lib/components/functional/rotate-control.component";
import { StagingComponent } from "@hexchess-3d-scene/lib/components/functional/staging.component";
import { View } from "@hexchess-3d-scene/lib/internals/scene/view";
import { SceneManager } from "@hexchess-3d-scene/scene/scene-manager";
import { bootstrapScene } from "@hexchess-3d-scene/scene/scene.factory";
import { Subject } from "rxjs";
import { ISceneInitializationData } from "../../models/scene-initialization";

@Injectable()
export class SceneInitializationService {
  public scene: SceneManager;
  public view: View;
  public dialogComponent: DialogComponent;
  public stagingComponent: StagingComponent;
  public boardComponent: BoardComponent;
  public rotateMenuComponent: RotateTileControlComponent;
  
  public mouseEvents$: Subject<MouseEvent> = new Subject();

  constructor() { }

  public createScene(d: ISceneInitializationData): void {
    const gameScene = bootstrapScene(d.sceneInputs);
    this.dialogComponent = gameScene.dialogComponent;
    this.stagingComponent = gameScene.stagingComponent;
    this.boardComponent = gameScene.boardComponent;
    this.rotateMenuComponent = gameScene.rotateMenuComponent;

    this.view = this.scene.createScene(d.sceneData);
    this.scene.createSceneObjects(d.sceneComposerSetup);
  }


  public adjustRendererSize() {
    this.view.adjustToViewportChange(innerWidth, innerHeight);
  }

}