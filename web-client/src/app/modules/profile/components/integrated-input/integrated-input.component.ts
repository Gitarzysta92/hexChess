import { Component, OnInit, ChangeDetectorRef, Optional, Self, Inject, ViewContainerRef, ElementRef, ViewChild, TemplateRef, EventEmitter, Input, Output } from "@angular/core";
import { NG_VALIDATORS, Validator, NG_ASYNC_VALIDATORS, AsyncValidator, NgModel, FormControl } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { takeUntil, filter, delay, map, distinct, skip, tap } from "rxjs/operators";
import { AttachedOverlayDirective } from "src/app/shared/directives/attached-overlay/attached-overlay.directive";


const STATE = {
  initial: 'initial',
  focused: 'focused',
  invalid: 'invalid',
  submitted: 'submitted',
  success: 'success',
  failure: 'failure'
};


class State {
  name: string;
  isFocused: boolean = false;
  submitted: boolean = false;
  validationError: boolean = null;
  submitSuccess: boolean = null;
  nextStates: string[] = [];

  stateChanger: (stateName: string) => void = () => null;

  constructor(data: Partial<State>) {
    this._setProperties(data);
  }

  public setName(value: string): void {
    this.name = value;
  }

  public is(name: string): boolean {
    return this.name === name;
  }

  public next(stateName?: string): void {
    if (this.nextStates.length === 1) {
      stateName = this.nextStates[0];
    }
    this.stateChanger(stateName);
  }


  private _setProperties(data: Partial<State>): void {
    Object.keys(data).forEach(key => {
      if (key in this) this[key] = data[key];    
    });
  }


}

class StateController<T extends State> {

  public get onChange() { 
    return this._state.pipe(map(s => Object.freeze(s))) 
  }

  public get currentState() {
    return this._state.value;
  }
  private _state: BehaviorSubject<T>;
  private _predefinedStates: { [key: string]: T } = {};
  
  constructor(
    stateName: string, 
    states: { [key: string]: T }, 
  ) {
    this._initializePredefinedStates(states);
    this._state = new BehaviorSubject(this._predefinedStates[stateName]);
  }


  public next(stateName: string): void {
    if (!this._isNextStateIsAvailable(stateName)) return;
    this.set(stateName);
  }

  public set(stateName: string): void {
    if (this._state.value.name === stateName) return;
    this._state.next(this._predefinedStates[stateName]);
  }

  public is(stateName: string): boolean {
    return this._state.value.is(stateName);
  }

  private _isNextStateIsAvailable(stateName: string): boolean {
    return this._state.value.nextStates.includes(stateName);
  }

  private _initializePredefinedStates(states: { [key: string]: any }): void {
    Object.keys(states).forEach(key => {
      const state = states[key];
      state.name = key;
      state.stateChanger = value => this.next(value);
      this._predefinedStates[key] = states[key];
    })
  }
}






@Component({
  selector: 'integrated-input',
  templateUrl: './integrated-input.component.html',
  styleUrls: ['./integrated-input.component.scss'],
})
export class IntegratedInputComponent implements OnInit {

  @ViewChild('nicknameInput', { static: true }) _nicknameInput: NgModel;
  @ViewChild('tooltipOverlay', { static: true }) _tooltip: AttachedOverlayDirective;

  @Input() value: string = '';
  @Input() name: string = '';
  @Input() type: string = 'text';
  @Output() onChange: EventEmitter<string> = new EventEmitter();

  public state: Observable<State>;

  private _stateController: StateController<State>;
  private _onDestroy: Subject<void> = new Subject();
  private _control: FormControl;

  constructor(
    private readonly _changeDetector: ChangeDetectorRef,
    @Optional() @Self() @Inject(NG_VALIDATORS) private readonly _validators: Validator | Validator[],
    @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) private readonly _asyncValidators: AsyncValidator | AsyncValidator[],
  ) { 

    this._stateController = new StateController(STATE.initial, {
      [STATE.initial]: new State({ nextStates: [STATE.focused] }),
      [STATE.focused]: new State({ isFocused: true, nextStates: [STATE.submitted, STATE.invalid] }),
      [STATE.invalid]: new State({ isFocused: true, validationError: true, nextStates: [STATE.focused, STATE.invalid] }),
      [STATE.submitted]: new State({ isFocused: true, validationError: false, submitted: true, nextStates: [STATE.success, STATE.failure] }),
      [STATE.success]: new State({ isFocused: true, submitted: true, submitSuccess: true, nextStates: [STATE.initial] }),
      [STATE.failure]: new State({ isFocused: true, submitted: true, submitSuccess: false, nextStates: [STATE.initial] })
    });

    this.state = (this._stateController.onChange as any)
      .pipe(takeUntil(this._onDestroy));

    //this.state.subscribe(console.log);

    this.state.pipe(filter(s => s.is(STATE.success) || s.is(STATE.failure)))
      .pipe(delay(1000))
      .subscribe(s => {
        if (s.is(STATE.failure))
          this._resetComponent();
        s.next();
      });
  }

  ngOnInit(): void {        
    this._control = this._nicknameInput.control;
    this._setValidators(this._control, this._validators, this._asyncValidators);
    this._listenForValidationStatus(this._control);
    this._toggleTooltipOnValidationStateChange();

    this.state.pipe(filter(s => s.is(STATE.initial)))
      .subscribe(() => this._resetComponent())
    
    this.state.subscribe(state => {
      this._changeDetector.markForCheck();
    });
  }
 
  public toggleFocus(event: FocusEvent): void {
    if (event.type === 'outsideclick' && this._stateController.is(STATE.focused)) {
      this._stateController.set(STATE.initial);    
    } else if (event.type === 'click' && this._stateController.is(STATE.initial)) {
      this._stateController.set(STATE.focused);
    }  
  }

  public selectTextInInput(input: HTMLInputElement): void {
    input.focus();
    //input.setSelectionRange(input.value.length, input.value.length);
  }

  public submitData(value) {
    if (this.value === value || !this._stateController.is(STATE.focused)) return;
    this.onChange.next(value);
    this._stateController.next(STATE.submitted)
  }

  public setSuccessState(): void {
    this._stateController.next(STATE.success);
  }

  public setFailureState(): void {
    this._stateController.next(STATE.failure);
  }

  private _resetComponent(): void {
    this._nicknameInput.control.reset(this.value);
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


  private _listenForValidationStatus(control: FormControl): void {
    control.statusChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(status => {
        if (status === 'VALID' && this._stateController.is(STATE.invalid)) {
          this._stateController.next(STATE.focused);
        } else if (status === 'INVALID') {
          this._stateController.next(STATE.invalid);
        }
        this._changeDetector.markForCheck();
      });
  }

  private _toggleTooltipOnValidationStateChange(): void {
    this.state.subscribe(s => s.is(STATE.invalid) ? this._tooltip.open() : this._tooltip.close());
  }
}

