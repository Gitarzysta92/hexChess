import { NgModule } from '@angular/core';
import { AvatarUploadComponent } from './components/avatar-upload/avatar-upload.component';
import { LanguagePickerComponent } from './components/language-picker/language-picker.component';
import { MyProfileViewComponent } from './components/my-profile-view/my-profile-view.component';
import { NicknameInputComponent } from './components/nickname-input/nickname-input.component';
import { MyProfileRoutingModule } from './my-profile.routing-module';
import { MyProfileSharedModule } from './my-profile.shared-module';


@NgModule({
  declarations: [
    MyProfileViewComponent,
    AvatarUploadComponent,
    LanguagePickerComponent,
    NicknameInputComponent,
  ],
  imports: [
    MyProfileRoutingModule,
    MyProfileSharedModule, 
  ],
  providers: []
})
export class MyProfileModule { }