import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Collection, StoreService } from 'src/app/core/services/store-service/store.service';
import { MyAccount } from '../models/my-account';
import { MyProfile } from '../models/profile';
import { ConfigurationService } from './configuration/configuration.service';
import { ProfileService } from './profile-service/profile.service';
import { UserService } from './user-service/user.service';


const updateMyAccount = Symbol('updateMyAccount');


@Injectable({ providedIn: 'root'})
export class MyAccountStore {

  public get state() { return this._collection.state };
  public get currentState() { return this._collection.currentState };

  private _collection: Collection<MyAccount>;

  constructor(
    private readonly _store: StoreService,
    private readonly _userService: UserService,
  ) {
    this._registerStore();
  }

  public update(profile: Partial<MyAccount>): Observable<void> {
    return this._collection.dispatch<Partial<MyAccount>>(updateMyAccount, profile);
  }

  private _registerStore() {
    this._collection = this._store.register<MyAccount>(Symbol('my-account'), () => {
      return {
        initialState: this._userService.getMyAccount(),
        actions: { 
          [updateMyAccount]: {
            before: [account => this._userService.updateMyAccount(account)], 
            action: this._updateAccount,
            after: [() => this._userService.refreshToken()]
          },
        } 
      }
    });
  }

  private _updateAccount = (a: MyAccount, state: MyAccount): MyAccount => {
    a.createdAt = state.createdAt;
    a.password = MyAccount.passwordPlaceholder;
    return Object.assign(state, a);
  }



}