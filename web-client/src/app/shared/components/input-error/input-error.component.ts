import { transition, trigger } from '@angular/animations';
import { Component, Inject, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormErrors, FormErrorsToken, FORM_ERRORS } from 'src/app/constants/form-errors';


export interface InputError {
  name: string;
  value: any;
}


@Component({
  selector: 'input-error',
  template: `<small *ngFor="let error of errorDescriptions">{{ error }}</small>`,
  styles: [
    `:host {
      padding: 5px 20px 0px 20px;
      color: #b6b6b6;
      display: block;
      font-size: 14px;
      box-sizing: border-box;
    }`
  ],
  providers: [
    { provide: FormErrorsToken, useValue: FORM_ERRORS }
  ]
})
export class InputErrorComponent implements OnInit, OnChanges {

  @Input() name: string;

  @Input() data: { name: string, value: any };  
  public errorDescriptions: string[] = [];
  constructor(
    @Inject(FormErrorsToken) private readonly _formErrors: FormErrors
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.data) return;
    this.errorDescriptions = Object.keys(this.data).map(key => {
      return this._generateErrorText(key);
    });
  }

  private _generateErrorText(value: string): string {
    let text;

    text = this._formErrors[value]
    if (text) 
      return text.replace(/(%fieldname%)/gi, this.name).replace(/(%content%)/gi, value );

    text = this._formErrors[this.data[value]]
    if (text) 
      return text.replace(/(%fieldname%)/gi, this.name)

    return this._capitalizeFirstLetter(text || "");
  };


  private _capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

}
