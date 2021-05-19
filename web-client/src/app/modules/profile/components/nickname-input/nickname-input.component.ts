import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Output, Self, SimpleChange, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AsyncValidator, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, NgControl, NgModel, NG_ASYNC_VALIDATORS, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { delay, distinct, filter, take, takeUntil } from 'rxjs/operators';
import { StateContainer } from 'utils';


const STATE = {
  initial: 'initial',
  focused: 'focused',
  validationError: 'validationError',
  submitted: 'submitted',
  success: 'success',
  failure: 'failure'
};

@Component({
  selector: 'nickname-input',
  templateUrl: './nickname-input.component.html',
  styleUrls: ['./nickname-input.component.scss'],
  host: {
   '[class.focus]': 'isFocused'
  }
})
export class NicknameInputComponent implements OnInit, OnChanges, OnDestroy  {

  @ViewChild('nicknameInput', { static: true }) nicknameInput: NgModel;

  @ViewChild('tooltip', { static: true }) tooltip: TemplateRef<any>;

  //@ViewChild('controls', { static: false }) controls: ElementRef;

  public control: FormControl;

  @Input() value: string = '';

  @Input() name: string = '';

  @Output() onChange: EventEmitter<string> = new EventEmitter();

  public isFocused: boolean = false;

  public submitted: boolean = false;

  public state: Observable<string>;

  public form: FormGroup;

  update: EventEmitter<any>;

  private _state: StateContainer<string>;
  private _onDestroy: Subject<void> = new Subject();
  embed: any;
  error: { name: string; value: unknown; };

  constructor(
    private readonly _changeDetector: ChangeDetectorRef,
    @Optional() @Self() @Inject(NG_VALIDATORS) private readonly _validators: Validator | Validator[],
    @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) private readonly _asyncValidators: AsyncValidator | AsyncValidator[],
    private readonly _overlayPositionBuilder: OverlayPositionBuilder,
    private readonly _overlay: Overlay,
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _host: ElementRef
  ) { 
    this._state = new StateContainer(STATE.initial, [
      STATE.initial,
      STATE.focused,
      STATE.validationError,
      STATE.submitted,
      STATE.success,
      STATE.failure
    ]);
    this.state = this._state.changed.pipe(takeUntil(this._onDestroy))

    this.state
      .pipe(filter(s => s === STATE.success || s === STATE.failure))
      .pipe(delay(1000))
      .subscribe(s => {
        if (s === STATE.failure) {
          this.nicknameInput.control.patchValue(this.value);
        } 
        this.isFocused = false;
        this._state.set(STATE.initial);
        this._changeDetector.markForCheck();
      });

    this.state
      .pipe(takeUntil(this._onDestroy))
      .subscribe(s => {
        if (s === STATE.validationError) {
          this.openTooltip();
        } else {
          this.closeTooltip();
        } 
      });

  }

  closeTooltip(): void {
    if (this.embed) {
      this.embed.detach();
    }
  }


  openTooltip(): void {
    this.closeTooltip();

    this.embed = this._overlay.create({
      positionStrategy: this._overlay.position().flexibleConnectedTo(this._host).withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetX: -35,
          offsetY: -20
        }
      ])
    });

    const portal =  new TemplatePortal(this.tooltip, this._viewContainerRef, { $implicit: this.control.errors });
    this.embed.attach(portal);

  }



  ngOnInit(): void {
  
  
    this.control = this.nicknameInput.control;

    this._setValidators(this.control, this._validators, this._asyncValidators);

    this.control.statusChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(status => {
        if (this._state.value === STATE.initial) return;
        if (status === 'VALID') {
          this._state.set(STATE.focused)
        } else if (status === 'INVALID') {
          this._state.set(STATE.validationError)
        }
        this._changeDetector.markForCheck();
      });

 
  }

  registerOnChange(fn: any){
    this.nicknameInput.valueAccessor.registerOnChange(fn);
  }

  registerOnTouched(fn: any){
    this.nicknameInput.valueAccessor.registerOnTouched(fn);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isSubmitted = this._state.value === STATE.submitted;
    if (isSubmitted) {
      this._state.set(STATE.success);
      this._changeDetector.detectChanges();
    }

    if (changes.value && this.control) {
      this.control.patchValue(changes.value.currentValue);
      this.control.updateValueAndValidity();
      this._changeDetector.markForCheck();
      //this.control.up
      console.log(this.control);
    }
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }


  public toggleFocus(event: FocusEvent, input: HTMLInputElement): void {
    if (this._state.value === STATE.submitted) return;

    this.isFocused = event.type !== 'outsideclick';
    if (!this.isFocused) {
      input.value = this.value;
      this._state.set(STATE.focused);
    }
  }


  public selectInput(input: HTMLInputElement): void {
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }
 
  public submitData(value) {
    if (this.value === value && !this.control.valid) return;
    this.onChange.next(value);
    this._state.set(STATE.submitted);
  }


  private _setValidators(
    control: FormControl,
    validators: Validator | Validator[], 
    asyncValidators: AsyncValidator | AsyncValidator[]
  ): void {
        
    if (!!validators) {
      validators = Array.isArray(validators) ? validators : [ validators ]; 
      control.setValidators(validators.map(av => av.validate.bind(av)));
    }
          
    if (!!asyncValidators) {
      asyncValidators = Array.isArray(asyncValidators) ? asyncValidators : [ asyncValidators ];
      control.setAsyncValidators(asyncValidators.map(av => av.validate.bind(av)));
    }
    control.updateValueAndValidity();
  }
}
