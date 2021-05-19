
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ProfileService } from 'src/app/core/services/profile-service/profile.service';


@Injectable({
  providedIn: 'root'
})
export class GamesService {
  

  private _myProfile

  constructor(
    private readonly _profileService: ProfileService,
  ) { 

  }

  public myHistory(): Observable<boolean[]> {
    return of([]);
  }
}
