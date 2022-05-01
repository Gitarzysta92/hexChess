import { Injectable } from '@angular/core';
import { iif, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/aspects/services/local-storage.service';
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

  private _localStorageKey: string = 'my-profile';

  constructor(
    private readonly _store: StoreService,
    private readonly _profileService: ProfileService,
    private readonly _localStorage: LocalStorageService
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
        initialState: this._localStorage.get(this._localStorageKey).pipe(switchMap(data => !!data ? of(data) : this._profileService.getMyProfile())),
        actions: { 
          [updateMyProfile]: {
            before: [profile => this._profileService.updateMyProfile(profile)], 
            action: this._updateProfile,
            after: [profile => this._localStorage.update(this._localStorageKey, profile)]
          },
          [updateAvatar]: {
            before: [
              (file, profile, ctx) => this._profileService.updateMyAvatar(file).pipe(tap(r => ctx.fileName = r)),
            ],
            action: this._updateAvatar,
            after: [profile => this._localStorage.update(this._localStorageKey, profile)]
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