import {
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
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
    return {
      token: this.jwtService.sign({ id, email, roles }),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (!user || !(await bcrypt.compare(userDto.password, user.password))) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    return user;
  }
}
