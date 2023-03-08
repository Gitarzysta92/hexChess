import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, Subject, timer } from 'rxjs';
import { catchError, concatMap, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProfileService } from 'src/app/core/my-profile/providers/profile-service/profile.service';



@Injectable()
export class ProfileValidators {

  constructor(
    private readonly _profileService: ProfileService,
  ) { }
  
  public unique(controlName: 'nickname' | 'email'): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors|null> => {
      if (!control.parent.value.hasOwnProperty(controlName)) 
        throw new Error(`Given control formgroup does not contain field: ${controlName}`);
      return this._checkProfilePropUniqueness({ [controlName]: control.value });
    }
  }

  public nicknameUniquenessValidator(control: AbstractControl, profileId?: string): Observable<ValidationErrors|null> {

      if (!control.value) return of(null);
      const propsToCheck = { nickname: control.value };
      if (profileId) {
        (propsToCheck as any).id = profileId;
      };

      return timer(1000).pipe(switchMap(() => this._checkProfilePropUniqueness(propsToCheck)));
  }

  public emailUniqueness(control: AbstractControl, profileId?: string): Observable<ValidationErrors|null> {
    if (!control.value) return of(null);
    const propsToCheck = { email: control.value };
    if (profileId) {
      (propsToCheck as any).id = profileId
    }
    return this._checkProfilePropUniqueness(propsToCheck);
  }

  private _checkProfilePropUniqueness(prop: { [key: string]: any }): Observable<ValidationErrors|null> {
    return this._profileService.isProfileExists(prop as any,)
      .pipe(map(isExists => isExists ?  { notUnique: true } : null ))
      .pipe(catchError(err => of({ connectionError: true })));
  }

}