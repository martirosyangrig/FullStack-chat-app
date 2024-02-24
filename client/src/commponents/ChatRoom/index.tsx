import { Avatar, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import emit, { useSocket } from "../../hooks/useSocket";
import formatTimestamp from "../../helpers/formatTimeStamp";
import {
  EmitEventsName,
  EventNames,
  IDataForJoinedRoom,
  IDataForLeftedRoom,
  IDataForMessage,
  IMessages,
  IOnlineUsers,
  IUser,
} from "../../interfaces";

import styles from "./chatRoom.module.scss";

export default function ChatRoom() {
  const [message, setMessage] = useState<string>("");
  const [userInfo, setUserInfo] = useState<IUser>();
  const [onlineUsers, setOnlineUsers] = useState<IOnlineUsers[]>([]);
  const [roomHistoryMessages, setRoomHistoryMessages] = useState<IMessages[]>(
    []
  );

  const messageContainerRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();

  useSocket(EventNames.Message, (data: IDataForMessage) => {
    setRoomHistoryMessages(data.messages);
  });

  useSocket(EventNames.JoinedRoom, (data: IDataForJoinedRoom) => {
    setRoomHistoryMessages(data.messages);

    const onlineUsersInRoom = data.onlineUsers.filter(
      (el: any) => el.roomId === id
    );
    setOnlineUsers(onlineUsersInRoom);
  });

  useSocket(EventNames.LeftedRoom, (data: IDataForLeftedRoom) => {
    setOnlineUsers(data.onlineUsers);
  });

  const sendMessage = () => {
    try {
      if (message.trim() !== "") {
        emit(EmitEventsName.SendMessage, { roomId: id, message: message });
      }

      setMessage("");
    } catch (error) {
      toast.error("Smth went wrong. Try again");
    }
  };

  useEffect(() => {
    const user: IUser = JSON.parse(sessionStorage.getItem("user") as string);

    emit(EmitEventsName.JoinRoom, { roomId: id, user });

    return () => {
      emit(EmitEventsName.LeftRoom, { roomId: id });
    };
  }, [id]);

  const getUserInfo = () => {
    const user: IUser = JSON.parse(sessionStorage.getItem("user") as string);
    setUserInfo(user);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!e.target.value.trim()) return;

    setMessage(e.target.value);
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight + 100;
    }
  }, [roomHistoryMessages]);

  return (
    <Box className={styles.wraper}>
      <Box className={styles.onlineUsers}>
        {onlineUsers.map((el: any) => {
          return (
            <div className={styles.users}>
              <Avatar
                alt="User Avatar"
                src={el.user.img || "default_image_url"}
                sx={{
                  width: 30,
                  height: 30,
                }}
              />
              <span>
                {el.user?.name} {el.user.id === userInfo?.id && "(me)"}
              </span>
            </div>
          );
        })}
      </Box>
      <Box className={styles.messageWraper}>
        <Box className={styles.messageContiner} ref={messageContainerRef}>
          {roomHistoryMessages.map((el: any) => {
            return (
              <div
                className={
                  el.id === userInfo?.id ? styles.messageMine : styles.message
                }
              >
                <Box className={styles.senderInfo}>
                  <Avatar
                    alt="User Avatar"
                    src={el.image || "default_image_url"}
                    sx={{
                      width: 30,
                      height: 30,
                    }}
                  />
                  <span className={styles.senderName}>{el.sender}</span>
                </Box>
                <span className={styles.messageText}>{el.text}</span>
                <span>{formatTimestamp(el.timestamp)}</span>
              </div>
            );
          })}
        </Box>
        <Box className={styles.inputContiner}>
          <textarea
            value={message}
            onChange={handleInputChange}
            className={styles.textarea}
            placeholder="Write your message here..."
            rows={4}
          />
          <button onClick={sendMessage}>Send</button>
        </Box>
      </Box>
    </Box>
  );
}
