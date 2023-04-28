import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { LocalStorageService } from 'src/app/infrastructure/data-store/services/local-storage/local-storage.service';
import { IMyProfileDto } from '../models/my-profile.dto';
import { MyProfileService } from '../services/my-profile/my-profile.service';
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
    private readonly _myProfileService: MyProfileService,
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
      initialState: this._localStorage.read<IMyProfileDto>(this._localStorageKey)
        .pipe(switchMap(data => !!data ? of(data) : this._myProfileService.getMyProfile())),
      actions: { 
        [MyProfileAction.updateMyProfile]: {
          action: (ctx) => this._updateMyProfile(ctx.payload, ctx.initialState),
          after: [
            ctx => this._myProfileService.updateMyProfile(ctx.computedState),
            ctx => this._localStorage.update(this._localStorageKey, ctx.computedState)
          ]
        },
        [MyProfileAction.updateAvatar]: {
          before: [
            ctx => this._myProfileService.updateMyAvatar(ctx.payload)
              .pipe(tap(n => Object.assign(ctx.custom, { fileName: n }))),
          ],
          action: ctx => this._updateAvatar(ctx.custom.fileName, ctx.initialState),
          after: [
            ctx => this._localStorage.update(this._localStorageKey, ctx.computedState)
          ]
        }
      } 
    });
  }

  private _updateMyProfile = (p: IMyProfileDto, state: IMyProfileDto): IMyProfileDto => {
    return Object.assign(state, p);
  }

  private _updateAvatar = (fileName: string, state: IMyProfileDto): IMyProfileDto => {
    return Object.assign(state, { avatarFileName: fileName })
  }
}