import { ISceneComposerSetup } from "@hexchess-3d-scene/scene/interfaces/scene-composer-setup";

export type ISceneEnvironmentDeclaration = Omit<ISceneComposerSetup, 'board'>;