import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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


export class ValidatrosAsync {

  static unique(provider: (data) => Observable<any>): Function {
    return (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return provider(ctrl.value)
        .pipe(tap(value => console.log(value)))
        .pipe(map(value => (!!value ? { uniqueAlterEgo: !!value } : null)))     
    }
  }

}