import { IsString, IsInt, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @IsString()
  username: string = '';

  @IsString()
  email: string = '';

  @IsOptional()
  @IsString()
  role?: string;
}
