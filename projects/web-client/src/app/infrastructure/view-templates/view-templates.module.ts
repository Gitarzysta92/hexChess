import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomViewTemplateComponent } from './components/custom-view/custom-view-template.component';
import { MainViewTemplateComponent } from './components/main-view-template/main-view-template.component';
import { MobileMenuButtonComponent } from './components/mobile-menu-button/mobile-menu-button.component';

@NgModule({
  declarations: [
    MainViewTemplateComponent,
    MobileMenuButtonComponent,
    CustomViewTemplateComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [
    MainViewTemplateComponent,
    CustomViewTemplateComponent
  ]
})
export class ViewTemplatesModule { }