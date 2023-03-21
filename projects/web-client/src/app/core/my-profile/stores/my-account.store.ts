import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Store, StoreService } from 'src/app/infrastructure/data-store/api';
import { IMyAccountDto } from '../models/my-account.dto';
import { ProfileService } from '../providers/profile-service/profile.service';
import { MyAccountAction } from './actions/actions';


@Injectable({ providedIn: 'root'})
export class MyAccountStore {

  public get state() { return this._store.state };
  public get currentState() { return this._store.currentState };

  private _store: Store<IMyAccountDto>;

  constructor(
    private readonly _storeService: StoreService,
    private readonly _profileService: ProfileService,
  ) {
    this._registerStore();
  }

  public update(profile: Partial<IMyAccountDto>): Observable<void> {
    return this._store.dispatch<Partial<IMyAccountDto>>(MyAccountAction.updateMyAccount, profile);
  }

  private _registerStore() {
    this._store = this._storeService.createStore<IMyAccountDto>(Symbol('my-account'), {
      initialState: this._profileService.getMyAccount().pipe(catchError(() => of({} as IMyAccountDto))),
      actions: { 
        [MyAccountAction.updateMyAccount]: {
          before: [account => this._profileService.updateMyAccount(account)], 
          action: this._updateAccount,
          after: [() => this._profileService.refreshToken()]
        },
      } 
    });
  }

  private _updateAccount = (a: IMyAccountDto, state: IMyAccountDto): IMyAccountDto => {
    a.createdAt = state.createdAt;
    a.password = null;
    return Object.assign(state, a);
  }
}