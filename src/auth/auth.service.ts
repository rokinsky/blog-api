import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user?: User) {
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const password = await bcrypt.hash(userDto.password, 5);

    try {
      const user = await this.userService.createUser({ ...userDto, password });
      return this.generateToken(user);
    } catch (err: unknown) {
      throw new ConflictException('User with such email is already exist');
    }
  }

  generateToken(user: User) {
    const { id, email, roles } = user;
    const payload: JwtPayload = { id, email, roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(userDto: CreateUserDto): Promise<User> {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (!user || !(await user.validatePassword(userDto.password))) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    return user;
  }
}
