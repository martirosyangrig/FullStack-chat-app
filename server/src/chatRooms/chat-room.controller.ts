import { Controller, Post, Delete, Body, Param, Get } from '@nestjs/common';
import { ChatRoomService } from './chat-room.service';
import { ChatRoom } from './chat-room.model';

@Controller('chat-rooms')
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @Get()
  getAllChatRooms(): ChatRoom[] {
    return this.chatRoomService.getAllChatRooms();
  }

  @Post()
  createChatRoom(@Body('name') name: string): ChatRoom {
    return this.chatRoomService.createChatRoom(name);
  }

  @Delete(':id')
  deleteChatRoom(@Param('id') chatRoomId: string): void {
    this.chatRoomService.deleteChatRoom(chatRoomId);
  }
}
