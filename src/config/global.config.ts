import { registerAs } from '@nestjs/config';

export const globalConfig = registerAs('global', () => ({
  port: Number(process.env.PORT),
  secret: process.env.PRIVATE_KEY,
}));
