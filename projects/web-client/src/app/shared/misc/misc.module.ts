import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconsModule } from "../icons/icons.module";
import { AppLogoComponent } from "./components/app-logo/app-logo.component";
import { ArmyBadgeComponent } from "./components/army-badge/army-badge.component";
import { CircleSpinnerComponent } from "./components/circle-spinner/circle-spinner.component";
import { CircleComponent } from "./components/circle/circle.component";
import { HexagonComponent } from "./components/hexagon/hexagon.component";
import { HoverDirective } from "./directives/hover/hover.directive";
import { OutsideClickDirective } from "./directives/outside-click/outside-click.directive";

@NgModule({
  declarations: [
    AppLogoComponent,
    ArmyBadgeComponent,
    CircleComponent,
    CircleSpinnerComponent,
    HexagonComponent,
    HoverDirective,
    OutsideClickDirective
  ],
  imports: [
    IconsModule
  ],
  exports: [
    AppLogoComponent,
    ArmyBadgeComponent,
    CircleComponent,
    CircleSpinnerComponent,
    HexagonComponent,
    HoverDirective,
    OutsideClickDirective
  ]
})
export class MiscModule { }
