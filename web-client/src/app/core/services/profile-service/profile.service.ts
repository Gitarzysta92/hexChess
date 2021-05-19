import { HttpClient } from '@angular/common/http';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { buildGetQuery } from 'src/app/utils/helpers/rest-api.helper';
import { AssignedArmy } from '../../models/army';
import { MyProfile, MyProfileFromDb, Profile } from '../../models/profile';
import { User } from '../../models/user';
import { ConfigurationService } from '../configuration/configuration.service';
import { UtilityService } from '../utility-service/utility.service';


interface ProfilePropsUniquenessQuery {
  id?: string;
  nickname?: string;
  email?: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _endpointPath: string = '/profiles'

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _config: ConfigurationService,
  ) { }


  public getMyProfile(): Observable<MyProfile> {
    return this._httpClient.get<MyProfileFromDb>(this._config.apiUrl + this._endpointPath + `/me`)
      .pipe(map(result => {
        return MyProfile.forClient(result);
      }));
  }

  public updateMyProfile(profile: MyProfile): Observable<boolean> {
    return this._httpClient.patch<MyProfile>(this._config.apiUrl + this._endpointPath + `/me`, profile).pipe(map(result => !!result));
  }

  public synchronizeSelectedArmies(currentIds: number[], profileId: string): Observable<boolean> {
    const selectedArmies = currentIds.map(armyId => new AssignedArmy({
      profileId: profileId,
      armyId: armyId,
      priority: currentIds.indexOf(armyId) + 1         
    }));

    return this._httpClient.post<boolean>(this._config.apiUrl + this._endpointPath + `/me/armies`, selectedArmies)
  }

  public updateMyAvatar(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this._httpClient.put(this._config.apiUrl + this._endpointPath + `/me/avatar`, formData, { responseType: 'text' })
  }

  // public updateSelectedArmiesByPriorities(
  //   currentIds: number[], 
  //   prevIds: number[],
  //   profileId: string
  // ): Observable<boolean> {
  //   console.log(currentIds, prevIds);

  //   const proiorityToDelete = currentIds.length < prevIds.length ? currentIds.length - 1 : null;

  //   if (proiorityToDelete !== null) {
  //     return this._httpClient.delete<boolean>(this._config.apiUrl + this._endpointPath + `/me/armies/${proiorityToDelete}`);
  //   } else {
  //     const armyId = currentIds.find((id, index) => id !== prevIds[index]);
  

  //     return this._httpClient.put<AssignedArmy[]>(this._config.apiUrl + this._endpointPath + `/me/armies`, army)
  //       .pipe(map(result => !!result))
  //   }
  // }


  public searchProfile(queryData: { [key: string]: string }): Observable<User> {
    const query = Object.entries(queryData).reduce((acc, data) => {
      const [ key, value ] = data;
      return `${acc.length > 0 ? '&' + acc : acc }${key}=${value}`
    }, "");
    return this._httpClient.get<User>(this._config.apiUrl + this._endpointPath + `?${query}`);
  }

  public isProfileExists(queryData: ProfilePropsUniquenessQuery): Observable<boolean> {
    const query = buildGetQuery(queryData);
    return this._httpClient.get<boolean>(this._config.apiUrl + this._endpointPath + `/exists?${query}`);
  }
}
