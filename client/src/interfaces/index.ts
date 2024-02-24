export interface IUser {
  id: string;
  img: string;
  name: string;
}

export interface IOnlineUsers {
  roomId: string;
  user: IUser;
}

export interface IMessages {
  id: string;
  image: string;
  sender: string;
  text: string;
  timestamp: string;
}

export interface IDataForJoinedRoom {
  messages: IMessages[];
  onlineUsers: IOnlineUsers[];
  roomId: string;
  userId: string;
}

export interface IDataForMessage {
  id: string;
  image: string;
  message: string;
  messages: IMessages[];
  sender: string;
  username: string;
}

export interface IDataForLeftedRoom {
  onlineUsers: IOnlineUsers[];
  roomId: string;
  userId: string;
}

export interface IChatRoom {
    name: string;
    id: string;
}

export enum EventNames {
  Message = "message",
  JoinedRoom = "joinedRoom",
  LeftedRoom = "leftedRoom",
}

export enum EmitEventsName {
  SendMessage = "sendMessage",
  JoinRoom = "joinRoom",
  LeftRoom = "leftRoom",
}
