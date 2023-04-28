import { query, transition, trigger, animateChild } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { slideIn, slideOut, swapViews } from 'src/app/shared/animations/predefined-animations';

@Component({
  selector: 'main-view-template',
  templateUrl: './main-view-template.component.html',
  styleUrls: ['./main-view-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    slideIn('slideIn'),
    slideOut('slideOut'),
    swapViews('routeAnimations'),
    trigger('triggerChilds', [
      transition('void => loaded', [
        query('@*', animateChild(), { optional: true })
      ]),
    ])
  ]
})
export class MainViewTemplateComponent implements OnInit, OnDestroy {

  public isMobile: boolean = false;
  public dataLoaded: boolean = false;
  private _onDestroy: Subject<void> = new Subject();

  constructor(
    public readonly routing: RoutingService,
    private readonly _changeDetector: ChangeDetectorRef,
    private readonly _breakPointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this._breakPointObserver
      .observe(["(max-width: 1024px)"])
      .subscribe(s => {
        this.isMobile = s.matches;
        this._changeDetector.markForCheck();
      });


    timer(2000)
      .subscribe(() => {
        this.dataLoaded = true;
        this._changeDetector.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  public prepareRoute(outlet: RouterOutlet) {
    if(!outlet.isActivated) return 'void';
    return outlet && outlet.component?.constructor?.name;
  }

}