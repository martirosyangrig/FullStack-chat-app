import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private onlineUsers: Map<
    string,
    { roomId: string; user: { name: string; img: string; id: string } }
  > = new Map();
  private pastMessages: Map<string, object[]> = new Map();

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}, ---------------------`);
  }

  handleDisconnect(client: Socket) {
    const userId = client.id;
    const userData = this.onlineUsers.get(userId);
    if (userData) {
      const { roomId } = userData;
      this.onlineUsers.delete(userId);
      this.server.to(roomId).emit('leftedRoom', {
        roomId,
        userId,
        onlineUsers: Array.from(this.onlineUsers.values()),
      });
    }
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    client: Socket,
    {
      roomId,
      user,
    }: { roomId: string; user: { id: string; name: string; img: string } },
  ) {
    try {
      client.join(roomId);

      const userId = client.id;
      if (!this.onlineUsers.has(userId)) {
        this.onlineUsers.set(userId, { roomId, user });
      }

      if (!this.pastMessages.has(roomId)) {
        this.pastMessages.set(roomId, []);
      }

      const messages = this.pastMessages.get(roomId);

      this.server.to(roomId).emit('joinedRoom', {
        userId,
        roomId,
        onlineUsers: Array.from(this.onlineUsers.values()),
        messages: messages || [],
      });
    } catch (error) {
      console.error('Error joining room:', error.message);
    }
  }

  @SubscribeMessage('leftRoom')
  handleLeftRoom(client: Socket, {}) {
    const userId = client.id;
    const userData = this.onlineUsers.get(userId);
    if (userData) {
      const { roomId } = userData;
      this.onlineUsers.delete(userId);
      this.server.to(roomId).emit('leftedRoom', {
        roomId,
        userId,
        onlineUsers: Array.from(this.onlineUsers.values()),
      });
    }
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(
    client: Socket,
    { roomId, message }: { roomId: string; message: string },
  ) {
    const userId = client.id;

    const currentUser = this.onlineUsers.get(userId);
    this.pastMessages.get(roomId).push({
      id: currentUser.user.id,
      sender: currentUser.user.name,
      text: message,
      image: currentUser.user.img,
      timestamp: new Date().toISOString(),
    });
    const messages = this.pastMessages.get(roomId);
    this.server.to(roomId).emit('message', {
      id: currentUser.user.id,
      sender: currentUser.user.name,
      message,
      username: currentUser.user.name,
      image: currentUser.user.img,
      messages,
    });
  }
}
