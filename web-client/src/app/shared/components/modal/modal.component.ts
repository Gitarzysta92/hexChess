import { transition, trigger, useAnimation } from '@angular/animations';
import { BlockScrollStrategy, GlobalPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, DomPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { slideInAnimation } from '../../animations/animations/slide-in.animation';
import { fadeIn, fadeOut, slideIn, slideOut } from '../../animations/predefined-animations';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    slideIn('fadeIn', 'fromRight'),
    slideOut('fadeOut', 'toRight')

    // trigger('fadeIn', [
    //   transition('* <=> *', [ 
    //     useAnimation(slideInAnimation('fromRight'))  
    //   ], { params: { delay: '0ms', duration: '220ms' } })
    // ])
  ]
})
export class ModalComponent implements OnInit {

  @ViewChild('modalTemplate', { static: true }) modalTemplate: TemplateRef<any>;
  o: OverlayRef;

  constructor(
    private readonly _overlay: Overlay,
    private readonly _viewContainerRef: ViewContainerRef
  ) { 
    this.o = this._overlay.create({
      height: '100%',
      width: '100%',
      hasBackdrop: false,
      positionStrategy: new GlobalPositionStrategy(),
      //scrollStrategy: new BlockScrollStrategy(),
    });
    
  }

  ngOnInit(): void {
    
  }

  open(): void {
    const portal =  new TemplatePortal(this.modalTemplate, this._viewContainerRef);
    //const portal = new DomPortal(this.paragraph)
    this.o.attach(portal);
  }

  close(): void {
    this.o.detach();
  }
}

