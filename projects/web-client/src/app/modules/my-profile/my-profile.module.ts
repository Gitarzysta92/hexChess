import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarUploadComponent } from './components/avatar-upload/avatar-upload.component';
import { LanguagePickerComponent } from './components/language-picker/language-picker.component';
import { MyProfileViewComponent } from './components/my-profile-view/my-profile-view.component';
import { NicknameInputComponent } from './components/nickname-input/nickname-input.component';
import { routes } from './my-profile.routing';
import { MyProfileSharedModule } from './my-profile.shared-module';



@NgModule({
  imports: [RouterModule.forChild(routes.bindComponents({
    me: MyProfileViewComponent
  }).toDefaultFormat())],
  exports: [RouterModule]
})
export class MyProfileRoutingModule { }


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

