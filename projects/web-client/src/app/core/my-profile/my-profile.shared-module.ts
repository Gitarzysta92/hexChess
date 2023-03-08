import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { IntegratedInputComponent } from './components/integrated-input/integrated-input.component';
import { MyAvatarWidgetComponent } from './components/my-avatar-widget/my-avatar-widget.component';
import { MyProfileWidgetComponent } from './components/my-profile-widget/my-profile-widget.component';


@NgModule({
  declarations: [
    MyProfileWidgetComponent,
    MyAvatarWidgetComponent,
    IntegratedInputComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    MyProfileWidgetComponent,
    MyAvatarWidgetComponent,
    SharedModule,
    IntegratedInputComponent
  ]
})
export class MyProfileSharedModule { }


