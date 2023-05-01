import { ModuleWithProviders, NgModule } from '@angular/core';
import { MAIN_INITIALIZE } from 'src/app/infrastructure/configuration/api';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArmyBadgeComponent } from './components/army-badge/army-badge.component';
import { ArmyPickerComponent } from './components/army-picker/army-picker.component';
import { MyArmiesWidgetComponent } from './components/my-armies-widget/my-armies-widget.component';
import { ArmyNotificationsToken, ARMY_NOTIFICATIONS } from './constants/army-notifications';
import { SelectedArmiesStore } from './stores/selected-armies.store';


@NgModule({
  declarations: [
    MyArmiesWidgetComponent,
    ArmyPickerComponent,
    ArmyBadgeComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    MyArmiesWidgetComponent,
    ArmyPickerComponent,
    ArmyBadgeComponent
  ],
})
export class ArmiesSharedModule { 
  static forRoot(): ModuleWithProviders<ArmiesSharedModule> {
    return {
      ngModule: ArmiesSharedModule,
      providers: [
        { provide: ArmyNotificationsToken, useValue: ARMY_NOTIFICATIONS },
        { provide: MAIN_INITIALIZE, useExisting: SelectedArmiesStore, multi: true }
      ]
    };
  }
}


