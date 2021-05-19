import { BlobServiceClient } from '@azure/storage-blob';
import { DynamicModule, Global, Inject, Module, Optional } from '@nestjs/common';
import { BlobStorageConfig, ConnectionString } from 'src/configs/blob-storage.config';
import { BlobStorageClient } from './blob-storage-client';
import { BLOB_CLIENT_OPTIONS, BLOB_CONTAINER_NAME, BLOB_DEFAULT_CLIENT, BLOB_MODULE_STORAGE, BLOB_STORAGE_ROOT_MODULE } from './blob-storage.constants';
import { BlobStorageAsyncConfig, BlobStorageOptions } from './blob-storage.interfaces';



@Module({})
export class BlobStorageModule {

  public static storage: { [key: string]: any } = {}


  constructor(
    @Optional() @Inject(BLOB_CLIENT_OPTIONS) private readonly _options: BlobStorageConfig | ConnectionString,
  ) {
    if (this._options)
      this._createBlobClient(this._options);
  }


  static forRootAsync(options: BlobStorageAsyncConfig): DynamicModule {
    return {
      module: BlobStorageModule,
      imports: options.imports,
      providers: [
        {
          provide: BLOB_CLIENT_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject
        },
        {
          provide: BLOB_MODULE_STORAGE,
          useValue: BlobStorageModule.storage
        },
        {
          provide: BLOB_DEFAULT_CLIENT,
          useValue: BLOB_DEFAULT_CLIENT
        },
        BlobStorageClient
      ],
      exports: [BlobStorageClient]
    }
  }

  static forFeature(containerName: string): DynamicModule {
    return {
      module: BlobStorageModule,
      providers: [
        {
          provide: BLOB_MODULE_STORAGE,
          useValue: BlobStorageModule.storage
        },
        {
          provide: BLOB_DEFAULT_CLIENT,
          useValue: BLOB_DEFAULT_CLIENT
        },
        {
          provide: BLOB_CONTAINER_NAME,
          useValue: containerName
        },
        BlobStorageClient
      ],
      exports: [BlobStorageClient]
    }
  }


  private _createBlobClient(options: BlobStorageConfig | ConnectionString): void {
    let connectionString;
    if (typeof options === 'string') {
      connectionString = options;
    } else {
      const { protocol, accountName, accountKey, endpoint } = options;
      connectionString = `DefaultEndpointsProtocol=${protocol};AccountName=${accountName};AccountKey=${accountKey};BlobEndpoint=${endpoint}/${accountName};`
    }
    const client = BlobServiceClient.fromConnectionString(connectionString);

    Object.defineProperty(BlobStorageModule.storage, BLOB_DEFAULT_CLIENT, {
      value: client,
      enumerable: true
    })
  }
}