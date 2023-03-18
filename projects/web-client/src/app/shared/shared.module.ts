import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonsModule } from "./buttons/buttons.module";
import { CommonsModule } from "./commons/commons.module";
import { DialogsModule } from "./dialogs/dialogs.module";
import { CustomFormsModule } from "./forms/custom-forms.module";
import { GridModule } from "./grid/grid.module";
import { IconsModule } from "./icons/icons.module";
import { MiscModule } from "./misc/misc.module";

@NgModule({
  imports: [
    CommonModule,
    ButtonsModule,
    CustomFormsModule,
    DialogsModule,
    IconsModule,
    MiscModule,
    CommonsModule,
    GridModule
  ],
  providers: [],
  exports: [
    CommonModule,
    ButtonsModule,
    CustomFormsModule,
    DialogsModule,
    IconsModule,
    MiscModule,
    CommonsModule,
    GridModule
  ]
})
export class SharedModule { }
