import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { WrappedSocket } from 'src/app/utils/ng-web-sockets/ng-web-sockets.service';



@NgModule({
  declarations: [ ],
  imports: [
    SharedModule,
  ],
  exports: [
  ],
  providers: [
    WrappedSocket
  ]
})
export class MatchmakingSharedModule { }
