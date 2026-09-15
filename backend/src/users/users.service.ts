import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // ваш Prisma Service
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    // Check by backend and send to dto
    return this.prisma.user.create({ data: dto });
  }
}