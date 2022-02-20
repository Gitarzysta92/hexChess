export interface BlobStorageOptions {
  connectionString: string;
  containerName: string;
}

export interface BlobStorageAsyncConfig {
  imports: any
  useFactory: any
  inject: any
  global?: boolean
}