import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { PrismaService } from "./prisma.service.js"; 
import { UserService } from "./user.service.js"; 

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService, UserService],
})
export class AppModule {}
