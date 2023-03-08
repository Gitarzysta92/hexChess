import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GameModes } from "./game-modes.routing";

GameModes.routes.bindComponents({})
@NgModule({
  imports: [RouterModule.forChild(GameModes.routes.toDefaultFormat())],
  exports: [RouterModule]
})
export class GameModesRoutingModule { }
