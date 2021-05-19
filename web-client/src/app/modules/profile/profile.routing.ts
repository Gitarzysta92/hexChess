import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ICONS } from 'src/app/constants/icons';
import { MenuLocations } from 'src/app/constants/menu-locations.enum';
import { MyProfileViewComponent } from './components/my-profile-view/my-profile-view.component';

export const ROOT_PATH = 'profile';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'me' },
  { path: 'me', component: MyProfileViewComponent, data: { menu: { location: MenuLocations.SecondaryMenu, label: 'My profile', icon: ICONS.profile } } },
  //{ path: 'friends', component: ProfileComponent, data: { menu: { location: MenuLocations.SecondaryMenu, label: 'Friends', icon: ICONS.profiles } } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
