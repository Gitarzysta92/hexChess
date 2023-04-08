import { BlobServiceClient } from "@azure/storage-blob";
import { Inject, Injectable, OnModuleInit, Optional } from "@nestjs/common";
import { BLOB_CONTAINER_NAME, BLOB_DEFAULT_CLIENT, BLOB_MODULE_STORAGE } from "./blob-storage.constants";


@Injectable()
export class BlobStorageClient implements OnModuleInit {
  
  private _blobServiceClient: BlobServiceClient

  constructor(
    @Inject(BLOB_DEFAULT_CLIENT) private readonly _defaultClientKey: string,
    @Inject(BLOB_MODULE_STORAGE) private readonly _storage: any,
    @Optional() @Inject(BLOB_CONTAINER_NAME) private readonly _containerName: string 
  ) {
    
    this._containerName = _containerName;
  }

  async onModuleInit(): Promise<void> {
    this._blobServiceClient = this._storage[this._defaultClientKey];

    await this._blobServiceClient.setProperties({
      cors: [{ 
        allowedOrigins: '*', 
        allowedHeaders: '*', 
        allowedMethods: 'DELETE,GET,HEAD,MERGE,POST,OPTIONS,PUT', 
        exposedHeaders: '*', 
        maxAgeInSeconds: 100  
      }]
    })

    this._createContainer(this._containerName);
  }

  public async upload(blobName: string, data: Buffer) {
    const containerClient = await this._blobServiceClient.getContainerClient(this._containerName);
    const blockBlobClient = await containerClient.getBlockBlobClient(blobName);
    return await blockBlobClient.upload(data, data.length);
  }

  private async _createContainer(containerName: string) {
    if (!containerName) return;
    const containerClient = this._blobServiceClient?.getContainerClient(containerName);
    if (!containerClient) throw new Error(`Can't create new blob container: ${containerName}`);

    const isContainerExists = await containerClient.exists();
    //containerClient.deleteIfExists();
    if (isContainerExists) return;

    return await containerClient.create({
      access: 'blob'
    });
  }
}