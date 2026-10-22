import { Transform } from 'class-transformer';
import { IsOptional, IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string= '';

  @IsString()
  email: string = '';

  @IsOptional()
  @IsString()
  role?: string;

  @IsString()
  password: string = '';

  @IsOptional()
  @Transform(({ value }) => (value === '' || value == null ? null : Number(value)))
  @IsInt()
  locationId?: number | null;
}