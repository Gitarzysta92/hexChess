import { registerAs } from "@nestjs/config";

export interface JwtAuthTokenConfig {
  secret: string
};

export const JWT_AUTH_TOKEN_CONFIG = 'JWT_AUTH_TOKEN_CONFIG';
export const jwtAuthTokenConfig = registerAs(JWT_AUTH_TOKEN_CONFIG, () => {
  const config: JwtAuthTokenConfig = {
    secret: process.env.AUTH_TOKEN_SECRET,
  }
  return config;
});