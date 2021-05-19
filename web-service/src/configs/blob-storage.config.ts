import { registerAs } from "@nestjs/config";

export interface BlobStorageConfig {
  protocol: string;
  endpoint: string;
  accountName: string;
  accountKey: string;
};

export type ConnectionString = string;


export const BLOB_STORAGE_CONFIG = 'blob-storage-config';
export const blobStorageConfig = registerAs(BLOB_STORAGE_CONFIG, () => {
  const connectionString = process.env.BLOB_CONNECTION_STRING;
  if (connectionString) {
    return connectionString as any;
  } else {
    return {
      protocol: process.env.BLOB_PROTOCOL,
      endpoint: process.env.BLOB_ENDPOINT,
      accountName: process.env.BLOB_ACCOUNT_NAME,
      accountKey: process.env.BLOB_ACCOUNT_KEY,
     }
  }
});

