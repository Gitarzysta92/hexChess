import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of, Subject, timer } from 'rxjs';
import { catchError, concatMap, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { MyAccountStore } from 'src/app/core/services/account.store';
import { ProfileService } from 'src/app/core/services/profile-service/profile.service';
import { UserService } from 'src/app/core/services/user-service/user.service';


@Injectable()
export class AccountValidators {

  constructor(
    private readonly _userService: UserService,
  ) { }
  
  public emailUniqueness(control: AbstractControl, profileId?: string): Observable<ValidationErrors|null> {
    if (!control.value) return of(null);
    const propsToCheck = { email: control.value };
    if (profileId) {
      (propsToCheck as any).id = profileId;
    };

    return timer(1000).pipe(switchMap(() => this._checkAccountUniqueness(propsToCheck)));
  }


  private _checkAccountUniqueness(prop: { [key: string]: any }): Observable<ValidationErrors|null> {
    return this._userService.isAccountExists(prop as any)
      .pipe(map(isExists => isExists ?  { notUnique: true } : null ))
      .pipe(catchError(err => of({ connectionError: true })));
  }

}