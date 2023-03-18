import { InjectionToken } from "@angular/core";


export const INPUT_ERRORS = {
  required: 'This field is required',
  notUnique: 'Your %fieldName% is not unique',
  minlength: '%fieldName% too short',
  maxlength: '%fieldName% too long',
  notEmail: '%content% is not a valid email',
  email: 'Email is not a valid email',
  connectionError: 'Connection error',
  //specialCharacters: 'Your password must contains at least on of this characters: !@#$%^'
  pattern: 'Your password must contains at least on of this characters: !@#$%^'
}


export type InputErrors = typeof INPUT_ERRORS;
export const InputErrorsToken = new InjectionToken<InputErrors>('input-errors');