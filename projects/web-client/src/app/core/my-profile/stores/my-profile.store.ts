import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { LocalStorageService } from 'src/app/infrastructure/data-store/services/local-storage/local-storage.service';
import { IMyProfileDto } from '../models/my-profile.dto';
import { ProfileService } from '../providers/profile-service/profile.service';
import { MyProfileAction } from './actions/actions';

const myProfile = Symbol('my-profile');

@Injectable({ providedIn: 'root'})
export class MyProfileStore {

  public get state() { return this._store.state };
  public get currentState() { return this._store.currentState; }

  private _store: Store<IMyProfileDto>;

  private _localStorageKey: string = 'my-profile';

  constructor(
    private readonly _storeService: StoreService,
    private readonly _profileService: ProfileService,
    private readonly _localStorage: LocalStorageService
  ) {
    this._registerStore();
  }

  public update(profile: Partial<IMyProfileDto>): Observable<void> {
    return this._store.dispatch<Partial<IMyProfileDto>>(MyProfileAction.updateMyProfile, profile);
  }

  public updateAvatar(file: File): void {
    this._store.dispatch<File>(MyProfileAction.updateAvatar, file);
  }

  private _registerStore() {
    this._store = this._storeService.createStore<IMyProfileDto>(myProfile, {
      initialState: this._localStorage.get<IMyProfileDto>(this._localStorageKey).pipe(switchMap(data => !!data ? of(data) : this._profileService.getMyProfile())),
      actions: { 
        [MyProfileAction.updateMyProfile]: {
          before: [profile => this._profileService.updateMyProfile(profile)], 
          action: this._updateProfile,
          after: [(_, state) => this._localStorage.update(this._localStorageKey, state)]
        },
        [MyProfileAction.updateAvatar]: {
          before: [
            (file, _, ctx) => this._profileService.updateMyAvatar(file).pipe(tap(r => ctx.fileName = r)),
          ],
          action: this._updateAvatar,
          after: [(_, state) => this._localStorage.update(this._localStorageKey, state)]
        }
      } 
    });
  }

  private _updateProfile = (p: IMyProfileDto, state: IMyProfileDto): IMyProfileDto => {
    return Object.assign(state, p);
  }

  private _updateAvatar = (file: File, state: IMyProfileDto, ctx: any): IMyProfileDto => {
    return Object.assign(state, { avatar: ctx.fileName })
  }
}