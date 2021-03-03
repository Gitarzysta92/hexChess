
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { OriginState, PanelOrigin} from '../components/panel-overlay/panel-overlay.component';

@Directive({
  selector: '[panel-origin]',
  exportAs:'panel-origin'
})
export class PanelOriginDirective implements PanelOrigin {
  private _open: boolean = false;
  private _context: any;
  public state: Subject<OriginState> = new Subject();

  public get isOpen() { return this._open };
  

  @Input('onClick') set setOnClick(value) {
    this._onClick = true;
  }

  private _onClick: boolean = false;

  @HostListener('click', ['$event']) toggle() {
    if (!this._onClick) return;
    this._open = !this._open;
    this.state.next({ open: this._open, context: this._context });
  }

  constructor(
    //private readonly overlay: Overlay
    public elementRef: ElementRef
  ) {   
    //this.overlay.create()
  }

  public setState(value: boolean): void {
    this._open = value;
    this.state.next({ open: this._open, context: this._context })
  }

  public openPanel(context: any): void {
    this._context = context;
    this.setState(true);
  }

  //@HostBinding()

}
