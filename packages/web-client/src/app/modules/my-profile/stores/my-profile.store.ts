import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Collection, StoreService } from 'src/app/core';
import { MyProfile } from '../models/profile';
import { ProfileService } from '../providers/profile-service/profile.service';


const myProfile = Symbol('my-profile');
const updateMyProfile = Symbol('updateProfile');
const updateSelectedArmies = Symbol('updateSelectedProfiles');
const updateAvatar = Symbol('updateAvatar');

@Injectable({ providedIn: 'root'})
export class MyProfileStore {

  public get state() { return this._collection.state };
  public get currentState() { return this._collection.currentState; }

  private _collection: Collection<MyProfile>;

  constructor(
    private readonly _store: StoreService,
    private readonly _profileService: ProfileService,
  ) {
    this._registerStore();
  }

  public update(profile: Partial<MyProfile>): Observable<void> {
    return this._collection.dispatch<Partial<MyProfile>>(updateMyProfile, profile);
  }


  public updateAvatar(file: File): void {
    this._collection.dispatch<File>(updateAvatar, file);
  }

  private _registerStore() {
    this._collection = this._store.register<MyProfile>(myProfile, () => {
      return {
        initialState: this._profileService.getMyProfile(),
        actions: { 
          [updateMyProfile]: {
            before: [profile => this._profileService.updateMyProfile(profile)], 
            action: this._updateProfile 
          },
          [updateAvatar]: {
            before: [
              (file, profile, ctx) => this._profileService.updateMyAvatar(file).pipe(tap(r => ctx.fileName = r)),
            ],
            action: this._updateAvatar
          }
        } 
      }
    });
  }

  private _updateProfile = (p: MyProfile, state: MyProfile): MyProfile => {
    p.avatar = state.avatar;
    return Object.assign(state, p);
  }

  private _updateAvatar = (file: File, state: MyProfile, ctx: any): MyProfile => {
    return Object.assign(state, { avatar: ctx.fileName })
  }

}