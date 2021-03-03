import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormErrors, FormErrorsToken, FORM_ERRORS } from 'src/app/constants/form-errors';


export interface InputError {
  name: string;
  value: any;
}


@Component({
  selector: 'input-error',
  template: `<small>{{ text }}</small>`,
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
export class InputErrorComponent implements OnInit {

  @Input() name: string;

  @Input() data: { name: string, value: any };  
  public text: string = null
  constructor(
    @Inject(FormErrorsToken) private readonly _formErrors: FormErrors
  ) { }

  ngOnInit(): void {
    console.log(this.data);


    this.text = this._parse();

    this.text = this.text.charAt(0).toUpperCase() + this.text.slice(1);
    
    
    this._formErrors[this.data.name];
  }

  private _parse(): string {
    const text = this._formErrors[this.data.name];
    if (this.name) {
      return text.replace(/(%fieldname%)/gi, this.name).replace(/(%content%)/gi, this.data.value.content );
    } else {
      return text
    }
  };



}
