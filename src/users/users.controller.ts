import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { JwtAuth } from '../auth/decorators/jwt-auth.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Users retrieving' })
  @ApiResponse({ status: 200, type: [User] })
  @JwtAuth('ADMIN')
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Give a role' })
  @ApiResponse({ status: 200 })
  @JwtAuth('ADMIN')
  @Post('/role')
  addRole(@Body() dto: AddRoleDto): Promise<void> {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'Ban a user' })
  @ApiResponse({ status: 200 })
  @JwtAuth('ADMIN')
  @Post('/ban')
  banUser(@Body() dto: BanUserDto): Promise<User> {
    return this.userService.ban(dto);
  }
}
