import { NgModule } from "@angular/core";
import { NavigationModule } from "src/app/aspects/navigation/navigation.module";
import { SoundEffectsModule } from "src/app/aspects/sound-effects/sound-effects.module";
import { ViewTemplatesModule } from "src/app/infrastructure/view-templates/view-templates.module";
import { ArmiesSharedModule } from "../armies/armies.shared-module";
import { MyProfileSharedModule } from "../my-profile/my-profile.shared-module";
import { MainViewComponent } from "./components/main-view/main-view.component";
import { MobileMenuButtonComponent } from "./components/mobile-menu-button/mobile-menu-button.component";
import { NotFoundViewComponent } from "./components/not-found-view/not-found-view.component";

@NgModule({
  declarations: [
    MainViewComponent,
    NotFoundViewComponent,
    MobileMenuButtonComponent
  ],
  imports: [
    ViewTemplatesModule,
    NavigationModule,
    MyProfileSharedModule,
    ArmiesSharedModule,
    SoundEffectsModule
  ]
})
export class MainModule { }