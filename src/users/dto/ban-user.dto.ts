import { IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @IsNumber()
  readonly userId: number;
  @IsString()
  readonly banReason: string;
}
