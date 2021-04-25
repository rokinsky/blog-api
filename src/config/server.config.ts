import { ConfigType, registerAs } from '@nestjs/config';

export type ServerConfig = ConfigType<typeof serverConfig>;

export const serverConfig = registerAs('server', () => ({
  port: Number(process.env.SERVER_PORT) || 5000,
  origin: process.env.SERVER_ORIGIN,
}));
