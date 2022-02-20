import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';



@Injectable()
export class CustomValidators {

  constructor() { }

  static email(control: AbstractControl): ValidationErrors|null {
    if (control.value === null || control.value === '') return null 
    return (control.value || '').match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi) ? null : { notEmail: { content: control.value } }
  }
}












// @Injectable({ providedIn: 'root' })
// export class UniqueAlterEgoValidator implements AsyncValidator {

//   constructor() {}

//   validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
//     return this.heroesService.isAlterEgoTaken(ctrl.value).pipe(
//       map(isTaken => (isTaken ? { uniqueAlterEgo: true } : null)),
//       catchError(() => of(null))
//     );
//   }
// };


// export class ValidatrosAsync {

//   static unique(provider: (data) => Observable<any>): Function {
//     return (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
//       return provider(ctrl.value)
//         .pipe(tap(value => console.log(value)))
//         .pipe(map(value => (!!value ? { uniqueAlterEgo: !!value } : null)))     
//     }
//   }

// }