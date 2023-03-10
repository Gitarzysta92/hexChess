import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ArmiesSharedModule } from "./armies.shared-module";

@NgModule({
  declarations: [
  ],
  imports: [
    ArmiesSharedModule,
    SharedModule
  ]
})
export class ArmiesModule { }

