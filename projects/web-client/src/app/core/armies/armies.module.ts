import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ArmiesSharedModule } from "./armies.shared-module";
import { ArmyPickerComponent } from "./components/army-picker/army-picker.component";
import { ArmyNotificationsToken, ARMY_NOTIFICATIONS } from "./constants/army-notifications";

@NgModule({
  declarations: [
  ],
  imports: [
    ArmiesSharedModule,
    SharedModule
  ],
  providers: [
    { provide: ArmyNotificationsToken, useValue: ARMY_NOTIFICATIONS },
  ]
})
export class ArmiesModule { }

