import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatRoom } from './chat-room.model';

@Injectable()
export class ChatRoomService {
  private chatRooms: ChatRoom[] = [
    {
      name: 'General Room',
      id: 'firstID',
    },
    {
      name: 'Second Room',
      id: 'secondID',
    },
  ];

  createChatRoom(name: string): ChatRoom {
    let timestamp = new Date().getTime();
    const id = name + timestamp.toString();
    const chatRoom = new ChatRoom(id, name);
    this.chatRooms.push(chatRoom);
    return chatRoom;
  }

  getAllChatRooms(): ChatRoom[] {
    return this.chatRooms;
  }

  deleteChatRoom(chatRoomId: string): void {
    const index = this.chatRooms.findIndex(
      (chatRoom) => chatRoom.id === chatRoomId,
    );
    if (index === -1) {
      throw new NotFoundException(`Chat room with ID ${chatRoomId} not found`);
    }
    this.chatRooms.splice(index, 1);
  }
}
