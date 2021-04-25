import { registerAs } from '@nestjs/config';

export const serverConfig = registerAs('server', () => ({
  port: Number(process.env.SERVER_PORT),
  origin: process.env.SERVER_ORIGIN,
}));
