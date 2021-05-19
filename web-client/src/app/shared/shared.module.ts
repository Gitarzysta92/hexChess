
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { RectButtonComponent } from './components/rect-button/rect-button.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { IconComponent } from './components/icon/icon.component';
import { CheckboxInputComponent } from './components/checkbox-input/checkbox-input.component';
import { InputErrorComponent } from './components/input-error/input-error.component';
import { CircleSpinnerComponent } from './components/circle-spinner/circle-spinner.component';
import { ExpandableListComponent } from './components/expandable-list/expandable-list.component';
import { ModalComponent } from './components/modal/modal.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PanelOverlayComponent } from './components/panel-overlay/panel-overlay.component';
import { PanelOriginComponent } from './components/panel-origin/panel-origin.component';
import { PanelOriginDirective } from './directives/panel-origin.directive';
import { HexagonComponent } from './components/hexagon/hexagon.component';
import { TileComponent } from './components/tile/tile.component';
import { HoverDirective } from './directives/hover/hover.directive';
import { ArmyBadgeComponent } from './components/army-badge/army-badge.component';
import { CircleComponent } from './components/circle/circle.component';
import { OutsideClickDirective } from './directives/outside-click/outside-click.directive';
import { UniqueNicknameValidatorDirective } from './directives/unique-nickname-validator/unique-nickname-validator.directive';
import { BurgerButtonComponent } from './components/burger-button/burger-button.component';
import { CrossButtonComponent } from './components/cross-button/cross-button.component';

import { TooltipComponent } from './components/tooltip/tooltip.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { UniqueEmailValidatorDirective } from './directives/unique-email-validator/unique-email-validator.directive';
import { AttachedOverlayDirective } from './directives/attached-overlay/attached-overlay.directive';

@NgModule({
  declarations: [
    NotificationComponent, 
    RectButtonComponent, 
    ReactiveFormComponent, 
    TextInputComponent, 
    IconComponent, 
    CheckboxInputComponent, 
    InputErrorComponent, 
    CircleSpinnerComponent, 
    ExpandableListComponent, 
    ModalComponent, 
    PanelOverlayComponent,  
    PanelOriginDirective,
    PanelOriginComponent,
    HexagonComponent,
    TileComponent,
    HoverDirective,
    ArmyBadgeComponent,
    CircleComponent,
    OutsideClickDirective,
    UniqueNicknameValidatorDirective,
    BurgerButtonComponent,
    CrossButtonComponent,
    TooltipComponent,
    UniqueEmailValidatorDirective,
    AttachedOverlayDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    NgScrollbarModule
  ],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RectButtonComponent,
    NotificationComponent,
    ReactiveFormComponent,
    TextInputComponent,
    IconComponent,
    CheckboxInputComponent,
    InputErrorComponent, 
    CircleSpinnerComponent,
    ExpandableListComponent,
    ModalComponent,
    OverlayModule,
    PanelOverlayComponent,
    PanelOriginDirective,
    PanelOriginComponent,
    HexagonComponent,
    TileComponent,
    ArmyBadgeComponent,
    CircleComponent,
    HoverDirective,
    OutsideClickDirective,
    UniqueNicknameValidatorDirective,
    BurgerButtonComponent,
    CrossButtonComponent,
    TooltipComponent,
    NgScrollbarModule,
    UniqueEmailValidatorDirective,
    AttachedOverlayDirective
  ]
})
export class SharedModule { }
