import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
