import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyProfileWidgetComponent } from './components/my-profile-widget/my-profile-widget.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileRoutingModule, ROOT_PATH, routes } from './profile.routing';
import { MyProfileViewComponent } from './components/my-profile-view/my-profile-view.component';



@NgModule({
  declarations: [
    MyProfileWidgetComponent, 
  ],
  imports: [
    SharedModule
  ],
  exports: [
    MyProfileWidgetComponent,
    SharedModule
  ]
})
export class ProfileSharedModule { }


@NgModule({
  declarations: [
    ProfileComponent,
    MyProfileViewComponent
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

