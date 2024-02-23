import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  private users: UserModel[] = [];

  createUser(name: string, img: string): UserModel {
    let timestamp = new Date().getTime();
    const id = name + timestamp.toString();
    const user = new UserModel(name, img, id);
    this.users.push(user);
    return user;
  }
}
