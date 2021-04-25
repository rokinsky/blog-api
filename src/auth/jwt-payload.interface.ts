import { Role } from '../roles/roles.model';

export interface JwtPayload {
  id: number;
  email: string;
  roles: Role[];
}
