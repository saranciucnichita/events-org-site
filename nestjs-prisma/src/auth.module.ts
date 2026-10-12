import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { JwtStrategy } from './auth/jwt.strategy.js';
import { UserService } from './user.service.js';
import { PrismaService } from './prisma.service.js';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: '1111', // In production follow .env
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, UserService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
