import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  IsUrl,
  validateSync,
} from 'class-validator';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Staging = 'staging',
}

class EnvironmentVariables {
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
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const exceptionFactory = new ValidationPipe({
      errorHttpStatusCode: HttpStatus.PRECONDITION_FAILED,
    }).createExceptionFactory();
    throw exceptionFactory(errors);
  }

  return validatedConfig;
}
