import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Collection, StoreService } from 'src/app/core/services/store-service/store.service';
import { MyProfile } from '../models/profile';
import { ConfigurationService } from './configuration/configuration.service';
import { ProfileService } from './profile-service/profile.service';


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

  public updateSelectedArmies(selectedArmiesIds: number[]): void {
    this._collection.dispatch<number[]>(updateSelectedArmies, selectedArmiesIds);
  }

  public updateAvatar(file: File): void {
    this._collection.dispatch<File>(updateAvatar, file);
  }

  private _registerStore() {
    this._collection = this._store.register<MyProfile>(Symbol('my-profile'), () => {
      return {
        initialState: this._profileService.getMyProfile(),
        actions: { 
          [updateMyProfile]: {
            before: [profile => this._profileService.updateMyProfile(profile)], 
            action: this._updateProfile 
          },
          [updateSelectedArmies]: {
            before: [
              (payload, profile) => this._profileService.synchronizeSelectedArmies(payload, profile.id)
            ],
            action: this._updateAssignedArmies
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
    p.selectedArmies = state.selectedArmies;
    p.avatar = state.avatar;
    return Object.assign(state, p);
  }

  private _updateAssignedArmies = (selectedArmiesIds: number[], state: MyProfile): MyProfile => {
    return Object.assign(state, { selectedArmies: selectedArmiesIds })
  }

  private _updateAvatar = (file: File, state: MyProfile, ctx: any): MyProfile => {
    return Object.assign(state, { avatar: ctx.fileName })
  }



}