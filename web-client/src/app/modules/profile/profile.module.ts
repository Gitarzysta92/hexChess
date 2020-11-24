import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';



@NgModule({
  declarations: [
  ProfileComponent],
  imports: [
    SharedModule
  ],
  providers: []
})
export class ProfileModule { }
