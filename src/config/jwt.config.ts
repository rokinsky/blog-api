import { ConfigType, registerAs } from '@nestjs/config';

export type JwtConfig = ConfigType<typeof jwtConfig>;

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
}));
