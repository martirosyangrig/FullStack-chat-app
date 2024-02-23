import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from './user.model';

@Controller('users')
export class UserControler {
  constructor(private readonly UserService: UserService) {}

  @Post()
  createUser(@Body() userDto: { name: string; img: string }): UserModel {
    return this.UserService.createUser(userDto.name, userDto.img);
  }
}
