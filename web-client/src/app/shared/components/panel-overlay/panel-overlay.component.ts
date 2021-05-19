import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Host, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, pipe, Subject } from 'rxjs';
import { distinct, takeUntil } from 'rxjs/operators';

export type OriginState = { open: boolean, context: any }


export interface PanelOrigin {
  state: Observable<OriginState>;
  elementRef: ElementRef;
  setState: (boolean) => void 
}


@Component({
  selector: 'panel-overlay',
  template: `<ng-template 
    cdkConnectedOverlay 
    [cdkConnectedOverlayOrigin]="origin" 
    [cdkConnectedOverlayOpen]="isOpen"
    [cdkConnectedOverlayWidth]="width"
    (overlayOutsideClick)="hidePanelByClick($event)">
      <div @slideIns class="panel-content" (mouseleave)="hidePanelByMouseLeave($event)">
        <ng-content></ng-content> 
      </div>
    </ng-template>`,
  styleUrls: ['./panel-overlay.component.scss'],
  animations: [
    trigger('slideIns', [
      transition(':enter', [
        style({ opacity: '0', transform: 'translate(0, -30px)', display: 'block' }),
        animate('200ms ease-in-out', style({ opacity: '1', transform: 'translate(0, 0)', display: 'block' }))
      ]),
      transition(':leave', [
        style({ opacity: '1', transform: 'translate(0, 0)', display: 'block' }),
        animate('200ms ease-in-out', style({ opacity: '0', transform: 'translate(0, -30px)', display: 'block' }))
      ]),
    ]),
  ]
})
export class PanelOverlayComponent implements OnInit, OnDestroy {

  public isOpen: boolean = false;
  public context: any;

  private _onDestroy$: Subject<void> = new Subject();

  @Input() origin: PanelOrigin

  @Input() hideOnMouseLeave: boolean = false;
  width: any;

  constructor() { }

  ngOnInit(): void {
    if (this.origin) {
      this.origin.state
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(data => {
          this.isOpen = data.open;
          this.width = this.origin.elementRef.nativeElement.offsetWidth;
          this.context = data.context;
        })
    }
  }

  ngOnDestroy(): void {
    this._onDestroy$.next()
  }

  protected hidePanelByClick(event: MouseEvent) {
    if (this.origin.elementRef.nativeElement.contains(event.target)) return;
    this.hidePanel();
  }

  protected hidePanelByMouseLeave(event: MouseEvent): void {
    if (!this.hideOnMouseLeave) return;
    this.hidePanel(); 
  }

  public hidePanel(): void {
    this.origin && this.origin.setState(false);
  }

}
