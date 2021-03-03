import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Army } from '../../models/army';
import { MyProfile } from '../../models/profile';


const myProfile = new MyProfile({ 
  name: 'Gitarzysta92', 
  avatar: '/assets/images/avatar.png', 
  selectedArmies: [1]  
})


@Injectable({
  providedIn: 'root'
})
export class MyProfileService {

  constructor() { }


  public getMyProfile(): Observable<MyProfile> {
    return of(myProfile);
  }

  updateMyProfile() {
    console.log('Myprofileservice - Update profile')
  }

  
}
