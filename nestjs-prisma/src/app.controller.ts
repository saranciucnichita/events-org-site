import { Controller, Get, Param, Post, Body, Put, Delete } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { User as UserModel } from "./generated/prisma/client.js";

@Controller()
export class AppController {
  constructor(
    private readonly UserService: UserService,
  ) {}

  @Get("user/:id")
  async getPostById(@Param("id") id: string): Promise<UserModel | null> {
    return this.UserService.user({ id: Number(id) });
  }

  @Get("users")
  async getPublishedPosts(): Promise<UserModel[]> {
    return this.UserService.users({});
  }

  @Get("filtered-users/:searchString")
  async getFilteredPosts(@Param("searchString") searchString: string): Promise<UserModel[]> {
    return this.UserService.users({
      where: {
        OR: [
          {
            username: { contains: searchString },
          },
          {
            email: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post("post")
  async createDraft(
    @Body() userData: { username: string; email: string; role?: string },
  ): Promise<UserModel> {
    const { username, email, role } = userData;
    return this.UserService.createUser({
      username,
      email,
      role,
    });
  }

  @Post("user")
  async signupUser(@Body() userData: { username: string; email: string, role?: string }): Promise<UserModel> {
    return this.UserService.createUser(userData);
  }

  @Delete("user/:id")
  async deletePost(@Param("id") id: string): Promise<UserModel> {
    return this.UserService.deleteUser({ id: Number(id) });
  }
}