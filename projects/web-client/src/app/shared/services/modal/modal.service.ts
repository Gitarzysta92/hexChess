import { GlobalPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, OnDestroy } from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';
import { RoutingService } from 'src/app/core';

@Injectable()
export class ModalService implements OnDestroy {

  private _o: OverlayRef;

  private readonly _onDestroy: Subject<void> = new Subject()

  constructor(
    private readonly _overlay: Overlay,
    private readonly _routing: RoutingService
  ) {
    this._routing.onNavigationStart
      .pipe(
        filter(() => !!this._o),
        takeUntil(this._onDestroy)
      )
      .subscribe(() => {
        this.close();
      });

    this._o = this._overlay.create({
      maxWidth: '400px',
      maxHeight: '600px',
      hasBackdrop: true,
      positionStrategy: new GlobalPositionStrategy().centerHorizontally().centerVertically(),
      disposeOnNavigation: true
      //scrollStrategy: new BlockScrollStrategy(),
    }); 
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  open(component: any): void {
    const portal =  new ComponentPortal(component);
    this._o.attach(portal);
  }

  close(): void {
    this._o?.detach();
  }
}
