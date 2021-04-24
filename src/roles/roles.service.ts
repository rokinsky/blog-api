import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private rolesRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto): Promise<Role> {
    return this.rolesRepository.create(dto);
  }

  async getRoleByValue(value: string): Promise<Role | null> {
    return this.rolesRepository.findOne({ where: { value } });
  }
}
