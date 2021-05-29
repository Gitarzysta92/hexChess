import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ChangeDetectionStrategy, ChangeDetectorRef, Input, OnDestroy, Optional } from '@angular/core';
import { Component } from '@angular/core';
import { fadeInMultipleElements, slideInFromTopMultipleElements } from '../../animations/predefined-animations';
import { ReactiveFormComponent } from '../reactive-form/reactive-form.component';
import { ReactiveInput, ReactiveInputConfig } from '../reactive-form/reactive-input';


export interface TextInputConfig extends ReactiveInputConfig { }

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  animations: [
    fadeInMultipleElements('slideIn')
  ]
})
export class TextInputComponent extends ReactiveInput {

  public textHidden: boolean = false;
  @Input('text-hidden') set hidden(value) {
    this.type = 'password';
    this.textHidden = true;
  };

  constructor(
    private readonly _reactiveForm: ReactiveFormComponent,
    //private readonly _changeDetector: ChangeDetectorRef

  ) {
    super(_reactiveForm);
  } 


  public toggleTextVisibility() {
    this.type = this.type === 'password' ? 'text' : 'password';
    this.textHidden = this.type === 'password';
  }
}
