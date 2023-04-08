export interface AuthTokenPayload {
  id: string;
  username: string, 
  profileId: string;
  exp: number;
  iat: number;
}