import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { EnvironmentVariables } from './env.model';

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
