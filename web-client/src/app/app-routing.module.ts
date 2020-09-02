import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { RegistrationViewComponent } from './components/registration-view/registration-view.component';
import { AuthenticationGuard } from './interceptors/authentication.guard';
import { MainMenuViewComponent } from './components/main-menu-view/main-menu-view.component';
import { PlayViewComponent } from './components/play-view/play-view.component';


const routes: Routes = [
  { path: '', 
    canActivate: [AuthenticationGuard],
    data: {
      onFailurePath: 'login'
    },
    children: [
      { path: '', pathMatch:'full', redirectTo:'main-menu' },
      { path: 'main-menu', component: MainMenuViewComponent },
      { path: 'play/:roomId', component: PlayViewComponent  }
  ]},
  
  { path: 'login', component: LoginViewComponent },
  { path: 'registration', component: RegistrationViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
