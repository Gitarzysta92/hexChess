import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GameplayViewComponent } from "./components/gameplay-view/gameplay-view.component";
import { Gameplay } from "./gameplay.routing";

@NgModule({
  imports: [
    RouterModule.forChild(Gameplay.routes.bindComponents({
      online: GameplayViewComponent
    }).toDefaultFormat())
  ],
  exports: [RouterModule]
})
export class GameplayRoutingModule { }