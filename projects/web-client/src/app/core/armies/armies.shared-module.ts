import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArmyPickerComponent } from './components/army-picker/army-picker.component';
import { MyArmiesWidgetComponent } from './components/my-armies-widget/my-armies-widget.component';
import { ArmyNotificationsToken, ARMY_NOTIFICATIONS } from './constants/army-notifications';


@NgModule({
  declarations: [
    MyArmiesWidgetComponent,
    ArmyPickerComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    MyArmiesWidgetComponent,
    ArmyPickerComponent
  ],
})
export class ArmiesSharedModule { 
  static forRoot(): ModuleWithProviders<ArmiesSharedModule> {
    return {
      ngModule: ArmiesSharedModule,
      providers: [
        { provide: ArmyNotificationsToken, useValue: ARMY_NOTIFICATIONS },
      ]
    };
  }
}


