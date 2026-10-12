import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { PrismaService } from "./prisma.service.js"; 
import { UserService } from "./user.service.js"; 
import { AuthModule } from './auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [PrismaService, UserService],
})
export class AppModule {}
