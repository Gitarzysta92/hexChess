export enum ActivityName {
  Initialization = "Initialization",
  StartTurn = "StartTurn",
  DrawTiles = "DrawTiles",
  DrawHeadquarter = "DrawHeadquarter",
  DiscardTiles = "DiscardTiles",
  DeployTile = "DeployTile",
  DisposeActionTile = "DisposeActionTile",
  DisposeAction = "DisposeAction",
  MoveTile = "MoveTile",
  FinishTurn = "FinishTurn",
  Surrender = "Surrender",
  ResponseRequest = "ResponseRequest",
  Reponse = "Reponse"
}

export interface Activity {
  playerId?: string;
  turn?: number;
  name: ActivityName;
  payload?: { [key: string]: any };
}
