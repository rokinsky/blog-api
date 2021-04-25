import { IsEnum, IsNumber, IsString, IsUrl } from 'class-validator';
import { DatabaseConfig } from './database.config';
import { JwtConfig } from './jwt.config';
import { ServerConfig } from './server.config';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Staging = 'staging',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  SERVER_PORT: number;

  @IsUrl()
  SERVER_ORIGIN: string;

  @IsString()
  POSTGRES_HOST: string;

  @IsString()
  POSTGRES_USER: string;

  @IsString()
  POSTGRES_DB: string;

  @IsString()
  POSTGRES_PASSWORD: string;

  @IsNumber()
  POSTGRES_PORT: number;

  @IsString()
  JWT_SECRET: string;

  database: DatabaseConfig;
  jwt: JwtConfig;
  server: ServerConfig;
}
