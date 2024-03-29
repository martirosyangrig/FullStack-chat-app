import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserControler } from './user.controller';

@Module({
  imports: [],
  controllers: [UserControler],
  providers: [UserService],
})
export class UserModule {}
