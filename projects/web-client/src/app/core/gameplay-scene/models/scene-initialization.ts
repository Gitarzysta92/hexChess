import { ISceneInputs } from "@hexchess-3d-scene/index";
import { ISceneComposerSetup } from "@hexchess-3d-scene/scene/interfaces/scene-composer-setup";
import { ISceneData } from "@hexchess-3d-scene/scene/interfaces/scene-manager";


export interface ISceneInitializationData {
  sceneData: ISceneData;
  sceneComposerSetup: ISceneComposerSetup;
  sceneInputs: ISceneInputs;
  staticAssetsPath: string;
}