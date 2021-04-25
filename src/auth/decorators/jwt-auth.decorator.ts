import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '../../roles/roles.model';
import { Roles } from './roles-auth.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export function JwtAuth(...roles: Role[] | string[]) {
  return applyDecorators(Roles(...roles), UseGuards(JwtAuthGuard, RolesGuard));
}
