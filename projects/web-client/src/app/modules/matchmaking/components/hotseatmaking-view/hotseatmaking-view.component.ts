import { trigger, transition, useAnimation, state, style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/core/services/routing/routing.service';
import { fadeOutAnimation } from 'src/app/shared/animations/animations/fade-out.animation';
import { slideIn, fadeIn } from 'src/app/shared/animations/predefined-animations';

@Component({
  selector: 'app-hotseatmaking-view',
  templateUrl: './hotseatmaking-view.component.html',
  styleUrls: ['./hotseatmaking-view.component.scss'],
  animations: [
    slideIn('slideInFromLeft', 'fromLeft'),
    slideIn('slideInFromRight', 'fromRight'),
    fadeIn('fadeIn'),
    trigger('fadeOut', [
      transition('void => success', useAnimation(fadeOutAnimation(), { params: { duration: '200ms', delay: '0ms' }})),
      state('success', style({
        opacity: 0,
      })),
    ])
  ]
})
export class HotseatmakingViewComponent implements OnInit {

  constructor(
    private readonly _routingService: RoutingService,
  ) { }

  ngOnInit(): void {
  }

  startMatch() {
    this._routingService.navigateToHotseatGame();
  }

}
