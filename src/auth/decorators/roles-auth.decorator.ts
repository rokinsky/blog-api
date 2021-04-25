import { SetMetadata } from '@nestjs/common';
import { Role } from '../../roles/roles.model';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: string[] | Role[]) =>
  SetMetadata(ROLES_KEY, roles);
