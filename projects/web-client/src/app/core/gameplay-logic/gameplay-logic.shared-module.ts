import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { GameStateStore } from "./stores/game-state.store";
import { GamepLoopService } from "./services/game-loop/game-loop.service";

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
  ],
  exports: [],
  providers: [
    GamepLoopService,
    GameStateStore
  ]
})
export class GameplayLogicSharedModule { }