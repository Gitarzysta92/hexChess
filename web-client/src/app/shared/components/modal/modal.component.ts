import { BlockScrollStrategy, GlobalPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, DomPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
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
      panelClass: 'modal-window'
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
