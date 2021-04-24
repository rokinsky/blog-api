import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @IsString()
  @IsEmail()
  readonly email: string;
  @ApiProperty({ example: '12345', description: 'Password' })
  @IsString()
  @Length(4, 16)
  readonly password: string;
}
