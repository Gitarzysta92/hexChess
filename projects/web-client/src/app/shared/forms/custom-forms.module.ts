import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CheckboxInputComponent } from "./components/checkbox-input/checkbox-input.component";
import { InputErrorComponent } from "./components/input-error/input-error.component";
import { ReactiveFormComponent } from "./components/reactive-form/reactive-form.component";
import { TextInputComponent } from "./components/text-input/text-input.component";
import { UniqueEmailValidatorDirective } from "./directives/unique-email-validator/unique-email-validator.directive";
import { UniqueNicknameValidatorDirective } from "./directives/unique-nickname-validator/unique-nickname-validator.directive";


@NgModule({
  declarations: [
    CheckboxInputComponent,
    InputErrorComponent,
    TextInputComponent,
    ReactiveFormComponent,
    UniqueEmailValidatorDirective,
    UniqueNicknameValidatorDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CheckboxInputComponent,
    InputErrorComponent,
    ReactiveFormComponent,
    TextInputComponent,
    UniqueEmailValidatorDirective,
    UniqueNicknameValidatorDirective,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CustomFormsModule { }
