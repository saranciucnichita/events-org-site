import { Controller, Get, Param, Post, Body, Put, Delete, HttpException, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { User as UserModel } from "./generated/prisma/client.js";
import { UseGuards } from "@nestjs/common";
import { Request, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service.js";
import { hash } from 'bcrypt';
import { UpdateUserDto } from "./updateuser.dto.js";

@Controller()
export class AppController {
  constructor(
    private readonly UserService: UserService,
    private readonly AuthService: AuthService,
  ) { }

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

  @Delete("user/:id")
  async deleteUser(@Param("id") id: string): Promise<UserModel> {
    return this.UserService.deleteUser({ id: Number(id) });
  }

  @Post("auth/login")
  async login(@Body() loginData: { username: string; pass: string }) {
    const user = await this.AuthService.validateUser(loginData.username, loginData.pass);
    if (!user) {
      throw new UnauthorizedException('Auth data is invalid');
    }
    return this.AuthService.login(user);
  }

  @Post("user")
  async signupUser(@Body() userData: { username: string; email: string, role?: string, password: string }): Promise<any> {
    const saltRounds = 10;
    const hashedPassword = await hash(userData.password, saltRounds);
    const newUser = await this.UserService.createUser({
        ...userData,
        password: hashedPassword,
      });
      return this.AuthService.login(newUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Request() req: any) {
    const userId = req.user.userId;

    const user = await this.UserService.user({ id: Number(userId) });
    if (user) {
      delete (user as any).password;
    }
    return user;
  }

  @Put("update/:id")
  async updateUser(@Param("id") id: string, @Body() updateuser: UpdateUserDto): Promise<UserModel> {
    return this.UserService.updateUser({
      where: { id: Number(id) },
      data: updateuser,
    });
  }
}