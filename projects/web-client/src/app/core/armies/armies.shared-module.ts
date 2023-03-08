import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArmyPickerComponent } from './components/army-picker/army-picker.component';
import { MyArmiesWidgetComponent } from './components/my-armies-widget/my-armies-widget.component';


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
export class ArmiesSharedModule { }


