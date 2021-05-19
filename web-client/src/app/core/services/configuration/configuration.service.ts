import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  public get apiUrl() { return environment.apiUrl }

  public get isProduction() { return environment.production }

  public get blobStorageUrl() { return  environment.blobStorageUrl }

  public get avatarsBlobStorageUrl() { return `${environment.blobStorageUrl}/avatars` }

  constructor() { }
}
