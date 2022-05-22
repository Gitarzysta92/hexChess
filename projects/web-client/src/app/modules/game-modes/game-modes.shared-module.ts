import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArmyPickerComponent } from './components/army-picker/army-picker.component';
import { MyArmiesWidgetComponent } from './components/my-armies-widget/my-armies-widget.component';
import { SelectedArmyWidgetComponent } from './components/selected-army-widget/selected-army-widget.component';
import { GameModeTileComponent } from './components/game-mode-tile/game-mode-tile.component';
import { notifications, NotificationsToken } from './constants/armies-notifications';
import { ArmiesSelectComponent } from './components/armies-select/armies-select.component';
import { MyGamesWidgetComponent } from './components/my-games-widget/my-games-widget.component';



@NgModule({
  declarations: [
    ArmyPickerComponent,
    MyArmiesWidgetComponent,
    SelectedArmyWidgetComponent,
    ArmiesSelectComponent,
    GameModeTileComponent,
    MyGamesWidgetComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    ArmyPickerComponent,
    MyArmiesWidgetComponent,
    SelectedArmyWidgetComponent,
    GameModeTileComponent,
    MyGamesWidgetComponent
  ],
  providers: [
    { provide: NotificationsToken, useValue: notifications },
  ]
})
export class GameModesSharedModule { }
