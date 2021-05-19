import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyProfileWidgetComponent } from './components/my-profile-widget/my-profile-widget.component';
import { ProfileRoutingModule, ROOT_PATH, routes } from './profile.routing';
import { MyProfileViewComponent } from './components/my-profile-view/my-profile-view.component';
import { AvatarUploadComponent } from './components/avatar-upload/avatar-upload.component';
import { LanguagePickerComponent } from './components/language-picker/language-picker.component';
import { NicknameInputComponent } from './components/nickname-input/nickname-input.component';
import { MyAvatarWidgetComponent } from './components/my-avatar-widget/my-avatar-widget.component';
import { IntegratedInputComponent } from './components/integrated-input/integrated-input.component';




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
export class ProfileSharedModule { }


@NgModule({
  declarations: [
    MyProfileViewComponent,
    AvatarUploadComponent,
    LanguagePickerComponent,
    NicknameInputComponent,
  ],
  imports: [
    ProfileRoutingModule,
    ProfileSharedModule, 
  ],
  providers: []
})
export class ProfileModule { 
  static path = ROOT_PATH;
  static routes = routes;
}

