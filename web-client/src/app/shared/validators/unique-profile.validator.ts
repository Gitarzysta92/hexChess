import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user-service/user.service';


@Injectable()
export class ProfileValidators {

  constructor(
    private readonly _userService: UserService
  ) {

  }
  
  unique(controlName: 'nickname' | 'email'): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors|null> => {
      if (!control.parent.value.hasOwnProperty(controlName)) 
        throw new Error(`Given control formgroup does not contain field: ${controlName}`);
      return this._userService.isProfileExists({ [controlName]: control.value } as any)
        .pipe(map(isExists => isExists ?  { notUnique: true } : null ))
        .pipe(catchError(err => of({ connectionError: true })));
    }
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