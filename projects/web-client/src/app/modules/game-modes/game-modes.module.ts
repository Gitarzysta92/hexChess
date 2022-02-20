import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './game-modes.routing';
import { GameModesSharedModule } from './game-modes.shared-module';

routes.bindComponents({})
@NgModule({
  imports: [RouterModule.forChild(routes.toDefaultFormat())],
  exports: [RouterModule]
})
export class GameModesRoutingModule { }



@NgModule({
  declarations: [

  ],
  imports: [
    GameModesRoutingModule,
    GameModesSharedModule,
  ],
})
export class GameModesModule { }
