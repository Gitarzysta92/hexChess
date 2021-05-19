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
      color: #e52c2c;
      display: block;
      font-size: 12px;
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
      return this._getErrorText(key);
    });
  }

  private _capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }


  private _getErrorText(value: string | InputError): string {
    let result = '';
    if (value === null) return result;
    if (typeof value === 'string') {
      const text = this._formErrors[value];
      result = text.replace(/(%fieldname%)/gi, this.name).replace(/(%content%)/gi, value );
    } else {
      const text = this._formErrors[Object.keys(value)[0]];
      result = text.replace(/(%fieldname%)/gi, this.name)
    }

    return this._capitalizeFirstLetter(result);
  };






}
