import { PlayerDeclaration } from "./game-configuration";

export class Player implements PlayerDeclaration {
  id!: string;
  name!: string;
  armyId!: string;
  tilesOrder!: string[];
  headquarterId!: string;
}