import { Controller, Get, Param, Post, Body, Put, Delete } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { User as UserModel } from "./generated/prisma/client.js";

@Controller()
export class AppController {
  constructor(
    private readonly UserService: UserService,
  ) {}

  @Get("user/:id")
  async getUserById(@Param("id") id: string): Promise<UserModel | null> {
    return this.UserService.user({ id: Number(id) });
  }

  @Get("users")
  async getPublishedUsers(): Promise<UserModel[]> {
    return this.UserService.users({});
  }

  @Get("filtered-users/:searchString")
  async getFilteredUsers(@Param("searchString") searchString: string): Promise<UserModel[]> {
    return this.UserService.users({
      where: {
            username: { contains: searchString },
      },
    });
  }

  @Post("user")
  async signupUser(@Body() userData: { username: string; email: string, role?: string, password: string }): Promise<UserModel> {
    return this.UserService.createUser(userData);
  }

  @Delete("user/:id")
  async deleteUser(@Param("id") id: string): Promise<UserModel> {
    return this.UserService.deleteUser({ id: Number(id) });
  }
}