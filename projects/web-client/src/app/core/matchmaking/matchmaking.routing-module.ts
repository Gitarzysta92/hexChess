import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatchmakingViewComponent } from "./components/matchmaking-view/matchmaking-view.component";
import { Matchmaking } from "./matchmaking.routing";

@NgModule({
  imports: [RouterModule.forChild(Matchmaking.routes.bindComponents({
    //root: MatchmakingLoadingViewComponent,
    quickmatch: MatchmakingViewComponent,
  }).toDefaultFormat())],
  exports: [RouterModule],
})
export class MatchmakingRoutingModule { }