import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArmiesSelectComponent } from './components/armies-select/armies-select.component';
import { ArmyPickerComponent } from './components/army-picker/army-picker.component';
import { MyArmiesWidgetComponent } from './components/my-armies-widget/my-armies-widget.component';
import { SelectedArmyWidgetComponent } from './components/selected-army-widget/selected-army-widget.component';
import { GameModesRoutingModule, ROOT_PATH, routes } from './game-modes.routing';
import { GameModeTileComponent } from './components/game-mode-tile/game-mode-tile.component';



@NgModule({
  declarations: [
    ArmyPickerComponent,
    MyArmiesWidgetComponent,
    SelectedArmyWidgetComponent,
    ArmiesSelectComponent,
    GameModeTileComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    ArmyPickerComponent,
    MyArmiesWidgetComponent,
    SelectedArmyWidgetComponent,
    GameModeTileComponent,
  ]
})
export class GameModesSharedModule { }

@NgModule({
  declarations: [

  ],
  imports: [
    GameModesRoutingModule,
    GameModesSharedModule,
    SharedModule,
  ],
  providers: [
  ]
})
export class GameModesModule { 
  static path = ROOT_PATH;
  static routes = routes;
}
