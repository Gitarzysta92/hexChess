import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyGamesWidgetComponent } from './components/my-games-widget/my-games-widget.component';


@NgModule({
  declarations: [
    MyGamesWidgetComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    MyGamesWidgetComponent,
  ],
})
export class GameplaySharedModule { }


