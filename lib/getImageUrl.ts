import { Config } from './appwriteConfig';

export const getImageUrl = (fileId: string) => {
  // Don't re-wrap if it's already a URL
  if (fileId.startsWith('http')) return fileId;

  return `https://cloud.appwrite.io/v1/storage/buckets/${Config.bucketId}/files/${fileId}/preview?project=${Config.projectId}`;
};
