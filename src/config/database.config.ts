import { ConfigType, registerAs } from '@nestjs/config';

export type DatabaseConfig = ConfigType<typeof databaseConfig>;

export const databaseConfig = registerAs('database', () => ({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
}));
