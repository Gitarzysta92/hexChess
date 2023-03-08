import { IGameConfiguration } from "./game-configuration";

export interface IGameMode {
  id: number;
  configuration: Omit<IGameConfiguration, "rules" | "board">;
  name: string;
  description: string;
  image: string;
}