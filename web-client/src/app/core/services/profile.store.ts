import { Injectable } from '@angular/core';
import { Collection, StoreService } from 'src/app/core/services/store-service/store.service';
import { MyProfile } from '../models/profile';
import { MyProfileService } from './profile-service/profile.service';


const updateMyProfile = Symbol('updateProfile');

@Injectable({ providedIn: 'root'})
export class MyProfileStore { 

  public get state() { return this._collection.state };

  private _collection: Collection<MyProfile>;

  constructor(
    private readonly _store: StoreService,
    private readonly _myProfileService: MyProfileService
  ) {
    this._registerStore();
  }

  public update(profile: Partial<MyProfile>): void {
    this._collection.dispatch<Partial<MyProfile>>(updateMyProfile, profile);
  }

  private _registerStore() {
    this._collection = this._store.register<MyProfile>(Symbol('games-summary'), () => {
      return {
        initialState: this._myProfileService.getMyProfile(),
        actions: { 
          [updateMyProfile]: {
            before: [() => this._myProfileService.updateMyProfile()], 
            action: this._updateProfile 
          } 
        } 
      }
    });
  }

  private _updateProfile = (p: MyProfile, state: MyProfile[]): MyProfile[] => Object.assign(state, p);
}