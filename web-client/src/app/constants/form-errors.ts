import { InjectionToken } from "@angular/core";


export const FORM_ERRORS = {
  required: 'This field is required',
  notUnique: 'Your %fieldName% is not unique',
  minlength: '%fieldName% too short',
  maxlength: '%fieldName% too long',
  notEmail: '%content% is not a valid email',
  connectionError: 'Connection error',
  //specialCharacters: 'Your password must contains at least on of this characters: !@#$%^'
  pattern: 'Your password must contains at least on of this characters: !@#$%^'
}


export type FormErrors = typeof FORM_ERRORS






































;
export const FormErrorsToken = new InjectionToken<FormErrors>('form-errors');