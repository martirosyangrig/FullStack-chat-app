import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { ChatRoomModule } from './chatRooms/chat-room.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [UserModule, ChatRoomModule ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
