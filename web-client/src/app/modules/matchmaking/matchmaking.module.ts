import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArmyPickerComponent } from './components/army-picker/army-picker.component';
import { LoadingViewComponent } from './components/loading-view/loading-view.component';
import { MatchmakingRoutingModule, ROOT_PATH, routes } from './matchmaking.routing';
import { GameSessionService } from './services/game-session/game-session.service';
import { MyArmiesWidgetComponent } from './components/my-armies-widget/my-armies-widget.component';
import { SelectedArmyWidgetComponent } from './components/selected-army-widget/selected-army-widget.component';
import { ArmyBadgeComponent } from './components/army-badge/army-badge.component';
import { MatchmakingViewComponent } from './components/matchmaking-view/matchmaking-view.component';
import { ArmiesSelectComponent } from './components/armies-select/armies-select.component'



@NgModule({
  declarations: [
    ArmyPickerComponent,
    MyArmiesWidgetComponent,
    SelectedArmyWidgetComponent,
    ArmyBadgeComponent,
    ArmiesSelectComponent,
    
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    ArmyPickerComponent,
    MyArmiesWidgetComponent,
    SelectedArmyWidgetComponent
  ]
})
export class MatchmakingSharedModule { }

@NgModule({
  declarations: [
    LoadingViewComponent,
    MatchmakingViewComponent,
  ],
  imports: [
    MatchmakingRoutingModule,
    MatchmakingSharedModule,
    SharedModule,
  ],
  providers: [
    GameSessionService
  ]
})
export class MatchmakingModule { 
  static path = ROOT_PATH;
  static routes = routes;
}
